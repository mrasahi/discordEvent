const Discord = require('discord.js');
const client = new Discord.Client()
const DiscordServer = require('../models/DiscordServer.js')


module.exports = {
    name: 'check',
    description: 'Check User role',
    args: false,
    usage: '<user> <role>',
    execute(message, args) {

        console.log(`Check command`)
        
    },
};