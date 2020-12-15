const Discord = require('discord.js');
const client = new Discord.Client()
const DiscordServer = require('../models/DiscordServer.js')

module.exports = {
    name: 'setup',
    description: 'Initial setup before running event commands',
    args: false,
    usage: '<user> <role>',
    execute(message, args) {

        let wam = ''
        let wamex = ''
        let structure = ''
        let speed = ''
        let links = ''
        let giant = ''
        let unique = ''

        DiscordServer.findById(message.guild.id)
            .then(result => {
                // console.log(result)
                if (result) {
                    // console.log(`server exists in db. returning`)
                    message.channel.send(`Error. Server ID has already been saved`)
                    return
                } else {

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
                                wam: [],
                                wamex: [],
                                structuredeck: [],
                                speed: [],
                                links: [],
                                giant: [],
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
                }

            })
            .catch(err => console.log(err))

    },
};
