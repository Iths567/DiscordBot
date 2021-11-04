const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const Discord = require('discord.js');

module.exports = {
        name: 'play',
        aliases: ['skip', 'stop', 'seek', 'p', 'leave', 'join'], // We are using aliases to run the skip and stop command follow this tutorial if lost: https://www.youtube.com/watch?v=QBUJ3cdofqc
        cooldown: 0,
        description: 'plays music init',
        async execute(message, args, cmd, client, Discord) {
    
        }
};