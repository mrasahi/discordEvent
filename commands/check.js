const Discord = require('discord.js');
const client = new Discord.Client()
const DiscordServer = require('../models/DiscordServer.js')


module.exports = {
    name: 'check',
    description: 'Test command to check db event',
    args: true,
    usage: '<user> <role>',
    execute(message, args) {

        // Fetches current server info from database
        DiscordServer.findById(message.guild.id)
            .then(result => {
                if (result === null) {
                    message.channel.send('Server ID has not been saved. Please run `!setup` before running commands')
                    return
                }

                const checkEvent = (eventName, eventDb) => {
                    console.log({ [eventDb]: { [eventName + '-' + [result[eventDb].length]]: 'playerCount' } })
                    console.log(result[eventDb])
                    if (result[eventDb].length === 0) {
                        // console.log(`will create ${eventName}`)
                        return message.channel.send(`${eventName} event has not been created yet.`)
                    } else if (Object.values(result[eventDb][result[eventDb].length - 1]).join() === 'pending') {
                        console.log(eventName + '-' + [result[eventDb].length])
                    } else {
                        console.log(eventName + '-' + [result[eventDb].length])
                        return message.channel.send(`A new ${eventName} event must be added first`)
                    }

                }

                switch (args[0]) {
                    case 'wam':
                        // console.log(`wam event`)
                        checkEvent('Win-A-Mat', 'wam')
                        break
                    case 'wamex':
                        // console.log(`wamex event`)
                        checkEvent('Win-A-Mat-ex', 'wamex')
                        break
                    case 'structure':
                        // console.log(`structure event`)
                        checkEvent('Structure-Deck', 'structure')
                        break
                    case 'speed':
                        // console.log(`speed event`)
                        checkEvent('Speed-Duel', 'speed')
                        break
                    case 'links':
                        // console.log(`duel links event`)
                        checkEvent('Duel-Links', 'links')
                        break
                    case 'giant':
                        // console.log(`giant event`)
                        checkEvent('Giant-Card', 'giant')
                        break
                    default:
                        // console.log('invalid args')
                        message.channel.send('`!start` command must a be followed by `wam`  |  `wamex`  |  `structure`  |  `speed`  |  `links`  |  `giant`')
                        break
                }
            })
            .catch(err => {
                console.log(err)
                message.channel.send(`Error finding serverID in database`)
            })


    },
};
