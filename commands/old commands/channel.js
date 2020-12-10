const Discord = require('discord.js');
const client = new Discord.Client()

module.exports = {
	name: 'channel',
    description: 'Test channels',
    args: false,
    usage: '<user> <role>',
	execute(message, args) {
        const channel = client
        console.log(channel)
        // console.log(message.guild.channels.cache.find(channel => channel.name === 'text2').id)
        // message.channel.send('no u')

	},
};
