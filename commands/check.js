const Discord = require('discord.js');
const client = new Discord.Client()
const DiscordServer = require('../models/DiscordServer.js')


module.exports = {
    name: 'check',
    description: 'Check User role',
    args: false,
    usage: '<user> <role>',
    execute(message, args) {

        console.log(`Check command`)

        // DiscordServer.findById(message.guild.id)
        //     .then(result => {
        //         // console.log(result.uniqueplayer)
        //         // console.log(message.guild.roles.cache.find(role => role.id === result.uniqueplayer).members.map(m => m.user.tag).length)
        //         message.channel.send(`Total Players: ${message.guild.roles.cache.find(role => role.id === result.uniqueplayer).members.map(m => m.user.tag).length}`)

        //     })
        //     .catch(err => {
        //         console.log(err)
        //         message.channel.send(`Error finding Player role ID from database.`)
        //     })
    },
};