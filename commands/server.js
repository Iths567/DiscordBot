module.exports = {
	name: 'server',
	description: 'Gives server name and amount of users, only works when the command is executed in a server',
	cooldown: 5,
	execute(message, args) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	},
};