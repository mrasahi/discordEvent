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
                    message.channel.send(`Error. Server ID is not saved in database`)
                    return
                }
                // Second prompt for player count
                message.channel.send('How many players are in this event?').then(() => {
                    const filter = m => message.author.id === m.author.id;
                    message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                        .then(messages => {
                            // Check reply message statement
                            if (messages.first().content >= 0) {
                                result.wam++
                                // console.log(result)
                                DiscordServer.findByIdAndUpdate(message.guild.id, { $set: { ["winamatevent" + result.wam]: messages.first().content,wam: result.wam }}, {new:true, upsert:true} )
                                .then(() => {
                                    console.log(`updated db`)
                                    message.channel.send(`${messages.first().content} players will be in this event`)
                                    message.guild.channels
                                        .create(`win-a-mat-${result.wam}`, {
                                            type: 'text',
                                        })
                                        .then((channel) => {
                                            // console.log(channel)
                                            channel.setParent(result.wamcategory)
                                                .then(() => {
                                                    message.channel.send(`Channel win-A-Mat-${result.wam} has been created.\nTotal WAM events: ${result.wam}`)
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
                                                name: `Win-A-Mat-${result.wam}`,
                                                color: 'BLUE',
                                            },
                                            reason: 'Win-A-Mat event created',
                                        })
                                            .then((role) => {
                                                // console.log(role)
                                                message.channel.send(`Role Win-A-Mat-${result.wam} has been created`)
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


        // message.channel.send('How many players are in this event?').then(() => {
        //     const filter = m => message.author.id === m.author.id;

        //     message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
        //         .then(messages => {
        //             if (messages.first().content === Number && messages.first().content >= 0) {
        //                 DiscordServer.findById(message.guild.id)
        //                     .then(result => {
        //                         console.log(result)
        //                     })
        //                     .catch(err => console.log(err))
        //                 message.channel.send(`${messages.first().content} players will be in this event`)
        //                 message.guild.channels
        //                 .create(`win-a-mat-${eventData.wam.events}`, {
        //                     type: 'text',
        //                 })
        //                 .then((channel) => {
        //                     // console.log(channel)
        //                     message.channel.send(`Channel win-A-Mat-${eventData.wam.events} has been created.\nTotal WAM events: ${eventData.wam.events}`)
        //                     message.guild.roles.create({
        //                         data: {
        //                           name: `Win-A-Mat-${eventData.wam.events}`,
        //                           color: 'BLUE',
        //                         },
        //                         reason: 'Win-A-Mat event created',
        //                       })
        //                         .then((role) => {
        //                             console.log(role)
        //                             message.channel.send(`Role Win-A-Mat-${eventData.wam.events} has been created`)
        //                         })
        //                         .catch(err => {
        //                             console.log(err)
        //                             message.channel.send(`An error has occured creating a role`)
        //                         })
        //                 })
        //                 .catch(err => {
        //                     console.log(err)
        //                     message.channel.send('An error has occured creating a new channel.')
        //                 })
        //             } else {
        //                 message.channel.send(`The value must be a valid number.\nNo changes have been made.`);
        //             }
        //         })
        //         .catch(() => {
        //             message.channel.send('An error or a time out has occured.');
        //         });
        // });

    },
};
