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


        // Delete Function for channels and roles
        const deleteFunction = (event) => {

            // 
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


        deleteFunction(`Win-A-Mat`)
        deleteFunction(`Structure-Deck`)
        deleteFunction(`Giant-Card`)
        deleteFunction(`Speed-Duel`)
        deleteFunction(`Duel-Links`)
        // Deletefunction for unique player role needed

        message.channel.send(`Cleaning up event roles and channels`)


    },
};
