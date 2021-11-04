module.exports = {
	name: 'ping',
	cooldown: 5,
	description: 'Ping',
	usage: '',
	execute(message, args) {
		message.channel.send('Pong.');
	},
};