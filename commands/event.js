const Discord = require('discord.js');
const client = new Discord.Client()
const DiscordServer = require('../models/DiscordServer.js')


module.exports = {
    name: 'event',
    description: 'View total events',
    args: false,
    usage: '<user> <role>',
    execute(message, args) {
        DiscordServer.findById(message.guild.id)
            .then(result => {

                let wam = result.wam.length
                let structure = result.structuredeck.length
                let speed = result.speedduel.length
                let links = result.duellinks.length
                let giant = result.giantcard.length


                message.channel.send(`Win-A-Mat: ${wam}\nStructure Deck: ${structure}\nSpeed Duels: ${speed}\nDuel Links: ${links}\nGiant Card: ${giant}\nTotal: ${wam + structure + speed + links + giant}`)

            })
            .catch(err => {
                console.log(err)
                message.channel.send('An error has occured reading the database')
            })
    },
};