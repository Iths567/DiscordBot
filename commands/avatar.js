module.exports = {
	name: 'avatar',
	aliases: ['icon', 'pfp'],
	usage: '[leave blank] @<user>',
	cooldown: 5,
	description: `Send the users avatar, or a mentioned user's avatar`,
	execute(message, args) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ dynamic: true })}>`);
		}

		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: <${user.displayAvatarURL({ dynamic: true })}>`;
		});

		message.channel.send(avatarList);
	},
};