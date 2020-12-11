const Discord = require('discord.js');
const client = new Discord.Client()
const DiscordServer = require('../models/DiscordServer.js')

module.exports = {
    name: 'addtoserver',
    description: 'Adds something to current servers db data',
    args: true,
    usage: '<user> <role>',
    execute(message, args) {

        if (args[0] === 'find') {
            DiscordServer.find()
                .then(result => {
                    console.log(result)
                })
                .catch(err => console.log(err))

        } else {

    
            console.log(message.guild.id)
    
            DiscordServer.findByIdAndUpdate(message.guild.id, { $set: { wam: "1", test: "no u" }}, {new:true, upsert: true} )
                .then(result => {
                    console.log(result)
                    message.channel.send(`Information updated successfully`)
                })
                .catch(err => {
                    console.log(err)
                    message.channel.send(`An error has occured saving to the database`)
                })
        }

    },
};
