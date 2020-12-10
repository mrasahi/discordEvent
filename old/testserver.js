const Discord = require('discord.js');
const { token, prefix } = require('./config.json');
const client = new Discord.Client();


// Runs this function when the bot is live
// .once will only run it the first time
client.once('ready', () => {
    console.log('Bot is online');
})

// Testing Count
let room = 1;
let count = 0;


// Bot listens to messages here
client.on('message', message => {
    // Required to run arguments in commands
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();


    // Checks arguments and variables following prefix
    if (command === 'args-info') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
    
        message.channel.send(`Command name: ${command}\nArguments: ${args}`);
    }

    // Direct reply mention
    if (command === `makashi`) {
        message.reply('I live')
    }

    // Testing Count
    if (message.content === `${prefix}count`) {
        message.reply(`Count: ${count}/3 \nRoom: ${room}`)
    }
    if (message.content === `${prefix}add 1`) {
        if (count >= 3) {
            count = 0;
            room++;
        }
        count++;
        message.channel.send(`${count}/3 \nRoom: ${room}`);
    }
    if (message.content === `${prefix}needed`) {
        message.channel.send(`Rooms: ${room} \nCurrent: ${count}/3 \nNeed: ${3 - count}`)
    }
    if (message.content === `${prefix}sub 1`) {
        count--;
        message.channel.send(count);
    }


    // Flexible startsWith prefix
    if (message.content.startsWith(`${prefix}startsWith`)) {
        message.channel.send(count)
    }


    // Discord's server name
    if (message.content === `${prefix}serverName`) {
        message.channel.send(message.guild.name)
    }
    if (message.content === `${prefix}server`) {
        message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
    }


    // Author info
    if (message.content === `${prefix}user-info`) {
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    }





})

// Uses bot token to connect and run
client.login(token);