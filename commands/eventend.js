const Discord = require('discord.js');
const client = new Discord.Client()
const DiscordServer = require('../models/DiscordServer.js')

module.exports = {
    name: 'eventend',
    description: 'Marks the Event as ended true',
    args: false,
    usage: '<user> <role>',
    execute(message, args) {

        // Will update eventEnd status to true and allow cleanup command
        DiscordServer.findByIdAndUpdate(message.guild.id, { eventEnd: true })
            .then(result => {
                message.channel.send('Event ended. The `!cleanup` command is available')
            })
            .catch(err => {
                console.log(err)
                message.channel.send(`An error has occured updating to the database`)
            })






    },
};
