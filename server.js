// Imports required to run app properly
const fs = require('fs')
const Discord = require('discord.js');
// const { token, prefix, mongoPath } = require('./config.json');
const { token } = require('./config.json')
const mongoose = require('mongoose')

const prefix = '!'
const mongoPath = "mongodb://localhost/discordEvent_db"

// Collections
const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

// fs reads commands file and assignes commands as their file name
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// Runs when the bot is live
// .once will only run it the first time
client.on('ready', () => {
    console.log('Bot is online');
    mongoose.connect(process.env.MONGODB_URI || mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
        .then(() => {
            // Connected to database successfully
            console.log('Connected to database')
        })
        .catch((err) => {
            // Error connecting to database
            console.log(err)
        });

})


// Bot listens to messages here
client.on('message', message => {

    // Checks and Rules go here

    // Required to run arguments in commands
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Prevents commands from breaking if they do not exist
    if (!client.commands.has(commandName)) return;

    // Assigns command as its name
    const command = client.commands.get(commandName);

    // Checks if args is required true for command
    if (command.args && !args.length) {
	    return message.channel.send(`Arguments required for this command, ${message.author}!`);
    }

    // guildOnly are commands only meant to be used inside servers and not through DMs
    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('Command is only from server-side');
    }

    // Cooldown and help handlers needed
    // https://discordjs.guide/command-handling/adding-features.html#cooldowns

    // Sample
    // if (command === 'ping') {
	// 	client.commands.get('ping').execute(message, args);
	// } else if (command === 'beep') {
	// 	client.commands.get('beep').execute(message, args);
	// } else if (command === 'server') {
	// 	client.commands.get('server').execute(message, args);
    // }
    

    // Shortened to run commands
    command.execute(message, args)




})

// Uses bot token to connect and run
client.login(process.env.BOT_TOKEN || token);