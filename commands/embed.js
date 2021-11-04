const Discord = require('discord.js');

module.exports = {
	name: 'embed',
	description: 'sends whatever embed is being currently tested',
	args: false,
	usage: ' ',
	execute(message, args) {

		const playingEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Now Playing')
			.setDescription(`video title`)
			.setThumbnail('https://logos-world.net/wp-content/uploads/2020/04/YouTube-Emblem-700x394.png');


		message.reply(playingEmbed);
	},
};
