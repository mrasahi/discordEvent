const Discord = require('discord.js');
const client = new Discord.Client()
const DiscordServer = require('../models/DiscordServer.js')


module.exports = {
    name: 'addwam',
    description: 'Add a Win-A-Mat event',
    args: false,
    usage: '<user> <role>',
    execute(message, args) {

        // Fetches current server info from database
        DiscordServer.findById(message.guild.id)
            .then(result => {
                // console.log(result)
                if (result === null) {
                    message.channel.send('Server ID has not been saved. Please run `!setup` before running commands')
                    return
                }
                // Second prompt for player count
                message.channel.send(`Creating Win-A-Mat-${result.wam.length +1}\nHow many players are in this event?`).then(() => {
                    const filter = m => message.author.id === m.author.id;
                    message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                        .then(messages => {
                            // Check reply message statement
                            if (messages.first().content >= 0) {
                                let newWam = result.wam.length + 1
                                // console.log(newWam)
                                DiscordServer.findByIdAndUpdate(message.guild.id, { $push: { wam: {["Win-A-Mat-" + newWam]: messages.first().content} }}, {new:true, upsert:true} )
                                .then(() => {
                                    // console.log(`updated db`)
                                    message.channel.send(`${messages.first().content} players will be in this event`)
                                    message.guild.channels
                                        .create(`win-a-mat-${newWam}`, {
                                            type: 'text',
                                        })
                                        .then((channel) => {
                                            // console.log(channel)
                                            channel.setParent(result.wamcategory)
                                                .then(() => {
                                                    message.channel.send(`Channel Win-A-Mat-${newWam} has been created.`)
                                                })
                                                .catch(err => {
                                                    message.channel.send(`Error moving channel to category`)
                                                    console.log(err)
                                                })
                                        })
                                        .catch(err => {
                                            console.log(err)
                                            message.channel.send('An error has occured creating a new channel.')
                                        })
                                        message.guild.roles.create({
                                            data: {
                                                name: `Win-A-Mat-${newWam}`,
                                                color: '3498db',
                                            },
                                            reason: 'Win-A-Mat event created',
                                        })
                                            .then((role) => {
                                                // console.log(role)
                                                message.channel.send(`Role Win-A-Mat-${newWam} has been created`)
                                            })
                                            .catch(err => {
                                                console.log(err)
                                                message.channel.send(`An error has occured creating a role`)
                                            })
                                })
                                .catch(err => {
                                    console.log(err)
                                    message.channel.send(`Error writing to database.\nNo changes have been made`)
                                })

                            } else {
                                message.channel.send(`The value must be a valid number.\nNo changes have been made.`);
                            }
                        })
                })

            })
            .catch(err => {
                console.log(err)
                message.channel.send(`Error finding serverID in database`)
            })


    },
};
