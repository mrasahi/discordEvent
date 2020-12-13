const Discord = require('discord.js');
const client = new Discord.Client()
const DiscordServer = require('../models/DiscordServer.js')


module.exports = {
    name: 'addgiant',
    description: 'Add a Giant Card event',
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
                message.channel.send(`Creating Giant-Card-${result.giantcard.length +1}\nHow many players are in this event?`).then(() => {
                    const filter = m => message.author.id === m.author.id;
                    message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                        .then(messages => {
                            // Check reply message statement
                            if (messages.first().content >= 0) {
                                let newGiant = result.giantcard.length + 1
                                // console.log(newGiant)
                                DiscordServer.findByIdAndUpdate(message.guild.id, { $push: { giantcard: {["Giant-Card-" + newGiant]: messages.first().content} }}, {new:true, upsert:true} )
                                .then(() => {
                                    // console.log(`updated db`)
                                    message.channel.send(`${messages.first().content} players will be in this event`)
                                    message.guild.channels
                                        .create(`win-a-mat-${newGiant}`, {
                                            type: 'text',
                                        })
                                        .then((channel) => {
                                            // console.log(channel)
                                            channel.setParent(result.giantcardcategory)
                                                .then(() => {
                                                    message.channel.send(`Channel Giant-Card-${newGiant} has been created.`)
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
                                                name: `Giant-Card-${newGiant}`,
                                                color: 'BLUE',
                                            },
                                            reason: 'Giant-Card event created',
                                        })
                                            .then((role) => {
                                                // console.log(role)
                                                message.channel.send(`Role Giant-Card-${newGiant} has been created`)
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
