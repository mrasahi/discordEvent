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

        DiscordServer.findById(message.guild.id)
            .then(result => {
                console.log(result)
            })
            .catch(err => console.log(err))

    },
};