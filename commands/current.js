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
                if (result === null) {
                    message.channel.send('Server ID has not been saved. Please run `!setup` before running commands')
                    return
                }

                const playerCount = (eventDb, roleName) => {
                    if (result[eventDb].length === 0) {
                        return `${roleName} eventDb not created\n=========================\n`
                    } else {
                        let count = message.guild.roles.cache.find(role => role.name === `${roleName}-${result[eventDb].length}`).members.map(m => m.user).length
                        return `${roleName}-${result[eventDb].length}\nPlayers:  ${count}\n=========================\n`
                    }
                }

                let wam = playerCount(`wam`, `Win-A-Mat`)
                let wamex = playerCount(`wamex`, `Win-A-Mat-ex`)
                let structure = playerCount(`structure`, `Structure-Deck`)
                let speed = playerCount(`speed`, `Speed-Duel`)
                let links = playerCount(`links`, `Duel-Links`)
                let giant = playerCount(`giant`, `Giant-Card`)
                
                message.channel.send('=========================\n' + wam + wamex + structure + speed + links + giant)

                // console.log(message.guild.roles.cache.find(role => role.name === `Win-A-Mat-${wam}`).members.map(m => m.user).length)


            })
            .catch(err => {
                console.log(err)
                message.channel.send('An error has occured reading the database')
            })
    },
};