const token = require('./token')
console.log(token)

const Discord = require('discord.js');
const client = new Discord.Client();

// Command prefix to communicate with the bot
const prefix = '!';


// Runs this function when the bot is live
// .once will only run it the first time
client.once('ready', () => {
    console.log('He lives...');
})

client.on('message', msg => {
    if (msg.content === "makashi") {
        msg.reply('I live')
    }
})

// Uses bot token to connect and run
client.login(token);