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
                let wamex = result.wamex.length
                let structure = result.structure.length
                let speed = result.speed.length
                let links = result.links.length
                let giant = result.giant.length

                message.channel.send(`Win-A-Mat: ${wam}\nWin-A-Mat-Ex: ${wamex}\nStructure Deck: ${structure}\nSpeed Duels: ${speed}\nDuel Links: ${links}\nGiant Card: ${giant}\n===============\nTotal Events: ${wam + wamex + structure + speed + links + giant}`)

            })
            .catch(err => {
                console.log(err)
                message.channel.send('An error has occured reading the database')
            })
    },
};