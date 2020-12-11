const Discord = require('discord.js');
const client = new Discord.Client()
// const mongoose = require('mongoose')
const DiscordServer = require('../models/DiscordServer.js')

module.exports = {
    name: 'saveserverid',
    description: 'Saves current server ID to database',
    args: false,
    usage: '<user> <role>',
    execute(message, args) {

        // mongoose.connect("mongodb://localhost/discordEvent_db")

        console.log(message.guild.id)

        const currentServer = new DiscordServer({
            _id: message.guild.id,
            serverid: message.guild.id,
            wam: 0,
            structuredeck: 0,
            speedduel: 0,
            duellinks: 0,
            giantcard: 0,
        })

        currentServer.save()
            .then(result => {
                console.log(result)
                message.channel.send(`Saved server ID to the database`)
            })
            .catch(err => {
                console.log(err)
                message.channel.send(`Error. Server ID has already been saved`)
            })

    },
};
