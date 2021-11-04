module.exports = {
	name: 'user-info',
	cooldown: 5,
	description: `Gives back the user's name and ID`,
	execute(message, args) {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	},
};