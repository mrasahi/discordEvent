const Discord = require('discord.js');
const client = new Discord.Client()
const DiscordServer = require('../models/DiscordServer.js')

module.exports = {
    name: 'cleanup',
    description: 'Deletes all event channels and roles',
    args: false,
    usage: '<user> <role>',
    execute(message, args) {

        // Check database event status is finished true before continuing

        // WILL DELETE ALL CHANNELS AND ROLES STARTING WITH
        // `Win-A-Mat`
        // `Structure-Deck`
        // `Giant-Card`
        // `Speed-Duel`
        // `Duel-Links`

        // Check if event has ended before cleanup
        DiscordServer.findById(message.guild.id)
            .then(result => {
                if (result === null) {
                    message.channel.send('Server ID has not been saved. Please run `!setup` before running commands')
                    return
                }
                // If event has ended
                if (result.eventEnd) {
                    // Delete Function for channels and roles
                    const deleteFunction = (event) => {

                        message.guild.roles.cache.filter(filteredType => filteredType.name.startsWith(event)).forEach(filteredData => filteredData.delete()
                            .then(() => {
                                // console.log(`role deleted`)
                                // message.channel.send(`${event} roles have been deleted`)
                            })
                            .catch(err => {
                                console.log(err)
                                // message.channel.send(`An error has occured deleting ${event} roles`)
                            })
                        )

                        message.guild.channels.cache.filter(filteredType => filteredType.name.startsWith(event.toLowerCase())).forEach(filteredData => filteredData.delete()
                            .then(() => {
                                // console.log(`channel deleted`)
                                // message.channel.send(`${event} channels have been deleted`)
                            })
                            .catch(err => {
                                console.log(err)
                                // message.channel.send(`An error has occured deleting ${event} channels`)
                            })
                        )

                    }

                    // Delete unique player role
                    message.guild.roles.cache.find(role => role.id === result.uniqueplayer).delete()
                        .then(() => {
                            // console.log(`Unique Player role deleted`)
                        })
                        .catch(err => console.log(err))


                    deleteFunction(`Win-A-Mat`)
                    deleteFunction(`Structure-Deck`)
                    deleteFunction(`Giant-Card`)
                    deleteFunction(`Speed-Duel`)
                    deleteFunction(`Duel-Links`)
                    // Deletefunction for unique player role needed

                    message.channel.send(`Cleaning up event roles and channels`)

                    DiscordServer.findByIdAndRemove(message.guild.id)
                        .then(() => {
                            message.channel.send(`Server ID has been cleared from the database.`)
                        })
                        .catch(err => {
                            console.log(err)
                            message.channel.send(`An error has occured cleaning this server ID from the database`)
                        })
                } else {
                    // If event has not ended
                    message.channel.send('Event has not been marked ended. Please run `!eventend` before running cleanup')
                }
            })
            .catch(err => {
                console.log(err)
                message.channel.send(`An error has occured finding the serverID in the database`)
            })





    },
};
