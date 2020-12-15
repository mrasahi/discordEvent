const Discord = require('discord.js');
const client = new Discord.Client()
const DiscordServer = require('../models/DiscordServer.js')


module.exports = {
    name: 'fullevent',
    description: 'View all events with max players',
    args: false,
    usage: '<user> <role>',
    execute(message, args) {
        DiscordServer.findById(message.guild.id)
            .then(result => {
                if (result === null) {
                    message.channel.send('Server ID has not been saved. Please run `!setup` before running commands')
                    return
                }

                // Events listing function
                const eachEvent = (eventName, eventData) => {
                    if (eventData.length === 0) {
                        return {
                            data: `${eventName} events: ${eventData.length}\n==============================\n`,
                            count: 0
                        }
                    } else {
                        let allEvents = eventData.map(event => `${Object.keys(event)}: ${Object.values(event)}`)
                        return {
                            data: `${eventName} events: ${eventData.length}\n------------------------------\n${allEvents.join('\n')}\n==============================\n`,
                            count: eventData.length
                        }
                    }
                }

                // Cleanup
                let wam = eachEvent(`Win-A-Mat`, result.wam)
                let wamex = eachEvent(`Win-A-Mat-Ex`, result.wamex)
                let structure = eachEvent(`Structure Deck`, result.structure)
                let speed = eachEvent(`Speed Duels`, result.speed)
                let links = eachEvent(`Duel Links`, result.links)
                let giant = eachEvent(`Giant Card`, result.giant)
                let total = `Total Events: ${wam.count + wamex.count + structure.count + speed.count + links.count + giant.count}\n==============================\n`

                // Message Events. Message will split if over 2000
                message.channel.send(total + wam.data + wamex.data + structure.data + speed.data + links.data + giant.data, { split: true } )

            })
            .catch(err => {
                console.log(err)
                message.channel.send('An error has occured reading the database')
            })

    },
};