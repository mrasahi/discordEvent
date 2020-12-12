const Discord = require('discord.js');
const client = new Discord.Client()
const DiscordServer = require('../models/DiscordServer.js')


module.exports = {
	name: 'fullevent',
    description: 'View all events with max players',
    args: false,
    usage: '<user> <role>',
	execute(message, args) {
        DiscordServer.findById(message.guild.id)
            .then(result => {
                // console.log(result.wam)
                let allWam = result.wam.map(wam => `${Object.keys(wam)}: ${Object.values(wam)}`)
                console.log(allWam.join('\n'))
                message.channel.send(`Total WAM events: ${result.wam.length}\n------------------------------\n${allWam.join('\n')}`)
            })
            .catch(err => {
                console.log(err)
                message.channel.send('An error has occured reading the database')
            })

	},
};