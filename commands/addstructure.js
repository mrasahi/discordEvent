const Discord = require('discord.js');
const client = new Discord.Client()
const DiscordServer = require('../models/DiscordServer.js')


module.exports = {
    name: 'addstructure',
    description: 'Add a Structure Deck event',
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
                message.channel.send(`Creating Win-A-Mat-${result.structuredeck.length +1}\nHow many players are in this event?`).then(() => {
                    const filter = m => message.author.id === m.author.id;
                    message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                        .then(messages => {
                            // Check reply message statement
                            if (messages.first().content >= 0) {
                                let newStructure = result.structuredeck.length + 1
                                // console.log(newStructure)
                                DiscordServer.findByIdAndUpdate(message.guild.id, { $push: { structuredeck: {["Structure-Deck-" + newStructure]: messages.first().content} }}, {new:true, upsert:true} )
                                .then(() => {
                                    // console.log(`updated db`)
                                    message.channel.send(`${messages.first().content} players will be in this event`)
                                    message.guild.channels
                                        .create(`structure-deck-${newStructure}`, {
                                            type: 'text',
                                        })
                                        .then((channel) => {
                                            // console.log(channel)
                                            channel.setParent(result.structuredeckcategory)
                                                .then(() => {
                                                    message.channel.send(`Channel Structure-Deck-${newStructure} has been created.`)
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
                                                name: `Structure-Deck-${newStructure}`,
                                                color: '9b59b6',
                                            },
                                            reason: 'Structure-Deck event created',
                                        })
                                            .then((role) => {
                                                // console.log(role)
                                                message.channel.send(`Role Structure-Deck-${newStructure} has been created`)
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
