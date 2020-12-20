const Discord = require('discord.js');
const client = new Discord.Client()
const DiscordServer = require('../models/DiscordServer.js')


module.exports = {
    name: 'add',
    description: 'Add an event and create text channel and role',
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

                const addEvent = (eventName, eventDb, color) => {
                    if (result[eventDb].length === 0) {
                        // console.log(`greater than 0`)
                    } else if (Object.values(result[eventDb][result[eventDb].length - 1]).join() === 'pending') {
                        return message.channel.send(`The last ${eventName} event has not been started yet\nEnter ` + '`!start ' + `${eventDb} ` + '<number>` to start the event')
                    }

                    console.log(result[eventDb])
                    DiscordServer.findByIdAndUpdate(message.guild.id, { $push: { [eventDb]: { [eventName + '-' + [result[eventDb].length + 1]]: 'pending' } } }, { new: true})
                        .then(res => {
                            // console.log(`saved to db`)
                            message.guild.channels.create(`${eventName.toLowerCase()}-${[result[eventDb].length + 1]}`, { type: 'text', })
                                .then(channel => {
                                    // console.log(`channel created`)
                                    message.channel.send(`New ${eventName} channel created`)
                                    channel.setParent(result[eventDb + 'category'])
                                        .then(() => {
                                            // console.log(`moved new channel to category`)
                                        })
                                        .catch(err => {
                                            console.log(err)
                                            message.channel.send(`error moving to ${eventName} category`)
                                        })
                                })
                                .catch(err => console.log(err))
                            message.guild.roles.create({
                                data: {
                                    name: `${eventName}-${[result[eventDb].length + 1]}`,
                                    color: color,
                                },
                                reason: `${eventName} event created`,
                            })
                                .then(() => {
                                    // console.log(`${eventName}-${[result[eventDb].length + 1]} role created`)
                                })
                                .catch(err => {
                                    console.log(`error creating ${eventName}-${[result[eventDb].length + 1]} role`)
                                })
                        })
                        .catch(err => console.log(err))


                }

                switch (args[0]) {
                    case 'wam':
                        // console.log(`wam event`)
                        addEvent('Win-A-Mat', 'wam', '3498db')
                        break
                    case 'wamex':
                        // console.log(`wamex event`)
                        addEvent('Win-A-Mat-ex', 'wamex', '206694')
                        break
                    case 'structure':
                        // console.log(`structure event`)
                        addEvent('Structure-Deck', 'structure', '9b59b6')
                        break
                    case 'speed':
                        // console.log(`speed event`)
                        addEvent('Speed-Duel', 'speed', 'e67e22')
                        break
                    case 'links':
                        // console.log(`duel links event`)
                        addEvent('Duel-Links', 'links', '95a5a6')
                        break
                    case 'giant':
                        // console.log(`giant event`)
                        addEvent('Giant-Card', 'giant', '992d22')
                        break
                    default:
                        // console.log('invalid args')
                        message.channel.send('`!add` command must a be followed by `wam`  |  `wamex`  |  `structure`  |  `speed`  |  `links`  |  `giant`')
                        break
                }
            })
            .catch(err => {
                console.log(err)
                message.channel.send(`Error finding serverID in database`)
            })


    },
};
