const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token, mongodb } = require('./config.json');
const mongoose = require('mongoose');

const { Intents } = Discord;
const intents = new Intents ();

for (const intent of Object.keys (Intents.FLAGS)) {
	if (!intent.includes ('GUILD')) continue;
	intents.add(intent);
}


const client = new Discord.Client ({
	intents: intents,
});
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

mongoose
	.connect(mongodb, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connected to the database!');
	})
	.catch((err) => {
		console.log(err);
	});

client.login(token);

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log('Ready!');
	// sets the bot's presence
	client.user.setPresence({
		status: 'available',
		activity: {
			name: 'Hentai Fun Time',
			type: 'PLAYING',
		},
	});
});
// this is the constant definition which should allow the bot to interact with the server (guild) however perhaps becuase it relies on the client recieving the guild ID it does not work?
const guild = client.guilds.cache.get('476431087296577546');


client.on('guildMemberAdd', member => {
	console.log('User ' + member.user.tag + ' has joined the server!');

	const role = member.guild.roles.cache.find(role => role.name === 'Nerds');
	console.log(member.roles.add(role));
}),

client.on('messageCreate', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const user = message.mentions.users.first();
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();


	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args, commandName);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

