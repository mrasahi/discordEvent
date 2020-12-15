const Discord = require('discord.js');
const client = new Discord.Client()
const DiscordServer = require('../models/DiscordServer.js')

module.exports = {
    name: 'setup',
    description: 'Initial setup before running event commands',
    args: false,
    usage: '<user> <role>',
    execute(message, args) {

        DiscordServer.findById(message.guild.id)
            .then(result => {
                if (result) {
                    console.log(`Server ID is already registered in database`)
                }
                console.log(`will run setup`)


                    message.guild.roles.create({
                        data: {
                            name: `Player`,
                            color: 'db23b5',
                        },
                        reason: 'Unique player count role',
                    })
                        .then(result => {
                            unique = result.id
                        })
                        .catch(err => console.log(err))

                    message.guild.channels.create(`win-a-mat`, { type: 'category', })
                        .then(result => {
                            wam = result.id
                        })
                        .catch(err => console.log(err))

                    message.guild.channels.create(`win-a-mat-ex`, { type: 'category', })
                        .then(result => {
                            wamex = result.id
                        })
                        .catch(err => console.log(err))

                    message.guild.channels.create(`structure-deck`, { type: 'category', })
                        .then(result => {
                            structure = result.id
                        })
                        .catch(err => console.log(err))

                    message.guild.channels.create(`speed-duel`, { type: 'category', })
                        .then(result => {
                            speed = result.id
                        })
                        .catch(err => console.log(err))

                    message.guild.channels.create(`duel-links`, { type: 'category', })
                        .then(result => {
                            links = result.id
                        })
                        .catch(err => console.log(err))

                    message.guild.channels.create(`giant-card`, { type: 'category', })
                        .then(result => {
                            giant = result.id
                        })
                        .catch(err => console.log(err))




                        // Creates field in the database
                        .then(() => {
                            const currentServer = new DiscordServer({
                                _id: message.guild.id,
                                serverid: message.guild.id,
                                wam: [{ 'Win-A-Mat-1': 'pending' }],
                                wamex: [{ 'Win-A-Mat-ex-1': 'pending' }],
                                structuredeck: [{ 'Structure-Deck-1': 'pending' }],
                                speed: [{ 'Speed-Duels-1': 'pending' }],
                                links: [{ 'Duel-Links-1': 'pending' }],
                                giant: [{ 'Giant-Card-1': 'pending' }],
                                wamcategory: wam,
                                wamexcategory: wamex,
                                structurecategory: structure,
                                speedcategory: speed,
                                linkscategory: links,
                                giantcategory: giant,
                                eventEnd: false,
                                uniqueplayer: unique
                            })
                            currentServer.save()
                                .then(result => {
                                    // console.log(result)
                                    message.channel.send(`Saved server ID to the database`)
                                })
                                .catch(err => {
                                    console.log(err)
                                    message.channel.send(`Error. Server ID has already been saved`)
                                })
                        })
                        .catch(err => console.log(err))
                        
            })
            .catch(err => console.log(err))

    },
};
