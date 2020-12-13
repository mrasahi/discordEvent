const Discord = require('discord.js');
const client = new Discord.Client()
const DiscordServer = require('../models/DiscordServer.js')

module.exports = {
    name: 'removetest',
    description: 'Remove Test',
    args: false,
    usage: '<user> <role>',
    execute(message, args) {


        // WILL DELETE ALL ROLES THAT STARTWITH 'roleName'
        // Delete Event Roles function
        // const deleteRole = (roleName) => {
        //     message.guild.roles.cache.filter(role => role.name.startsWith(roleName)).forEach(filteredRole => filteredRole.delete()
        //         .then(() => {
        //             console.log(`role deleted`)
        //             // message.channel.send(`${roleName} roles have been deleted`)

        //         })
        //         .catch(err => {
        //             console.log(err)
        //             message.channel.send(`An error has occured deleting ${roleName} roles.`)

        //         })
        //     )
        // }


        // deleteRole(`Win-A-Mat-`)
        // deleteRole(`Structure-Deck-`)
        // deleteRole(`Giant-Card-`)
        // deleteRole(`Speed-Duel-`)
        // deleteRole(`Duel-Links-`)
        // message.channel.send(`Event roles have been removed.`)


        // Delete Event Channels function
        // const deleteChannel = (channelName) => {
        //     message.guild.channels.cache.filter(channel => channel.name.startsWith(channelName)).forEach(filteredChannel => filteredChannel.delete()
        //         .then(() => {
        //             // console.log(`role deleted`)
        //             // message.channel.send(`${channelName} channels have been deleted`)
        //         })
        //         .catch(err => {
        //             console.log(err)
        //             message.channel.send(`An error has occured deleting ${channelName} channels`)
        //         })
        //     )
        // }

        // deleteChannel(`test-channel-`)


        // const deleteFunction = (event) => {
        //     // Channels delete
        //     message.guild.channels.cache.filter(channel => channel.name.startsWith(event)).forEach(filteredData => filteredData.delete()
        //         .then(() => {
        //             // console.log(`role deleted`)
        //             // message.channel.send(`${event} channels have been deleted`)
        //         })
        //         .catch(err => {
        //             console.log(err)
        //             message.channel.send(`An error has occured deleting ${event} channels`)
        //         })
        //     )

        //     // Roles delete
        //     message.guild.roles.cache.filter(role => role.name.startsWith(event)).forEach(filteredData => filteredData.delete()
        //         .then(() => {
        //             console.log(`role deleted`)
        //             // message.channel.send(`${event} roles have been deleted`)

        //         })
        //         .catch(err => {
        //             console.log(err)
        //             message.channel.send(`An error has occured deleting ${event} roles.`)

        //         })
        //     )
        // }

        // type must be 'role' or 'channel'
        const deleteFunction = (event, type) => {
            if (type === `channel`) {
                event = event.toLowerCase()
            }
            message.guild[type + 's'].cache.filter(filteredType => filteredType.name.startsWith(event)).forEach(filteredData => filteredData.delete()
                .then(() => {
                    // console.log(`role deleted`)
                    // message.channel.send(`${event} [type + 's'] have been deleted`)
                })
                .catch(err => {
                    console.log(err)
                    // message.channel.send(`An error has occured deleting ${event} [type + 's']`)
                })
            )
        }


        deleteFunction(`Win-A-Mat`, 'channel')
        deleteFunction(`Structure-Deck`, 'channel')
        deleteFunction(`Giant-Card`, 'channel')
        deleteFunction(`Speed-Duel`, 'channel')
        deleteFunction(`Duel-Links`, 'channel')
        


    },
};
