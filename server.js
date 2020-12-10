const fs = require('fs')
const Discord = require('discord.js');
const { token, prefix } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// Runs this function when the bot is live
// .once will only run it the first time
client.once('ready', () => {
    console.log('Bot is online');
})


// Bot listens to messages here
client.on('message', message => {

    // Required to run arguments in commands
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    // Sample
    // if (command === 'ping') {
	// 	client.commands.get('ping').execute(message, args);
	// } else if (command === 'beep') {
	// 	client.commands.get('beep').execute(message, args);
	// } else if (command === 'server') {
	// 	client.commands.get('server').execute(message, args);
    // }
    

    // Commands go here
    command.execute(message, args)




})

// Uses bot token to connect and run
client.login(token);