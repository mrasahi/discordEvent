const Discord = require('discord.js');
const client = new Discord.Client()
const DiscordServer = require('../models/DiscordServer.js')


module.exports = {
    name: 'current',
    description: 'View current player count in current events',
    args: false,
    usage: '<user> <role>',
    execute(message, args) {

        DiscordServer.findById(message.guild.id)
            .then(result => {

                const playerCount = (event, roleName) => {
                    if (result[event].length === 0) {
                        return `${roleName} event not created\n`
                    } else {
                        let count = message.guild.roles.cache.find(role => role.name === `${roleName}-${result[event].length}`).members.map(m => m.user).length
                        return `${roleName}-${result[event].length}: ${count} player(s) assigned\n`
                    }
                }

                let wam = playerCount(`wam`, `Win-A-Mat`)
                let wamex = playerCount(`wamex`, `Win-A-Mat-Ex`)
                let structure = playerCount(`structuredeck`, `Structure-Deck`)
                let speed = playerCount(`speedduel`, `Speed-Duel`)
                let links = playerCount(`duellinks`, `Duel-Links`)
                let giant = playerCount(`giantcard`, `Giant-Card`)
                

                message.channel.send(wam + wamex + structure + speed + links + giant)

                // console.log(message.guild.roles.cache.find(role => role.name === `Win-A-Mat-${wam}`).members.map(m => m.user).length)


            })
            .catch(err => {
                console.log(err)
                message.channel.send('An error has occured reading the database')
            })
    },
};