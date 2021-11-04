module.exports = {
	name: `args-info`,
	description: `infomation about the arguments provided`,
	args: true,
	usage: '[argument]',
	cooldown: 7,
	execute(message, args) {
		if (args[0] === 'foo') {
			return message.channel.send('bar');
		}
		message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
	},
};