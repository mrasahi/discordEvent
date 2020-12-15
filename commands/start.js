const Discord = require('discord.js');
const client = new Discord.Client()
const DiscordServer = require('../models/DiscordServer.js')


module.exports = {
    name: 'start',
    description: 'Start an event and mark how many players in it',
    args: true,
    usage: '<user> <role>',
    execute(message, args) {

        if (!args[1]) {
            return message.channel.send('A number is missing in `!start <event> <number>`')
        } else if (!Number.isInteger(parseInt(args[1]))) {
            return message.channel.send('Must be a valid number in `!start <event> <number>`')
        }

        // Fetches current server info from database
        DiscordServer.findById(message.guild.id)
            .then(result => {
                if (result === null) {
                    message.channel.send('Server ID has not been saved. Please run `!setup` before running commands')
                    return
                }

                const startEvent = (eventName, eventDb, playerCount) => {
                    if (result[eventDb].length === 0) {
                        // console.log(`will create ${eventName}`)
                        return message.channel.send(`${eventName} event has not been created yet.`)
                    } else if (Object.values(result[eventDb][result[eventDb].length - 1]).join() === 'pending') {
                        DiscordServer.findByIdAndUpdate(message.guild.id, { $set: { [eventDb]: { [eventName + '-' + result[eventDb].length]: playerCount } } }, { new: true })
                        .then(result => {
                            // console.log(result)
                            // console.log(`event started and updated in db`)
                            message.channel.send(`${eventName + '-' + result[eventDb].length} has been started with ${playerCount} players`)
                        })
                        .catch(err => {
                            console.log(err)
                            message.channel.send(`An error has occured updating ${eventDb} in db`)
                        })
                    } else {
                        return message.channel.send(`A new ${eventName} event must be added first`)
                    }

                }

                switch (args[0]) {
                    case 'wam':
                        // console.log(`wam event`)
                        startEvent('Win-A-Mat', 'wam', args[1])
                        break
                    case 'wamex':
                        // console.log(`wamex event`)
                        startEvent('Win-A-Mat-ex', 'wamex', args[1])
                        break
                    case 'structure':
                        // console.log(`structure event`)
                        startEvent('Structure-Deck', 'structure', args[1])
                        break
                    case 'speed':
                        // console.log(`speed event`)
                        startEvent('Speed-Duel', 'speed', args[1])
                        break
                    case 'links':
                        // console.log(`duel links event`)
                        startEvent('Duel-Links', 'links', args[1])
                        break
                    case 'giant':
                        // console.log(`giant event`)
                        startEvent('Giant-Card', 'giant', args[1])
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
