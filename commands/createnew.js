const Discord = require('discord.js');
const client = new Discord.Client()

module.exports = {
	name: 'createnew',
    description: 'Creates new event, role,',
    args: false,
    usage: '<user> <role>',
	execute(message, args) {
        if (args.length === 0) {
            message.channel.send('Please enter more input.').then(() => {
                const filter = m => message.author.id === m.author.id;
            
                message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                    .then(messages => {
                        if (messages.first().content === 'channel') {
                            const channelName = 'new-channel'
                            message.guild.channels
                                .create(channelName, {
                                    type: 'text',
                                })
                                .then((channel) => {
                                    console.log(channel)
                                    message.channel.send(`Channel created`)
                                })
                        } else {
                            message.channel.send(`You've entered: ${messages.first().content}`);
                        }
                    })
                    .catch(() => {
                        message.channel.send('You did not enter any input!');
                    });
            });
        } else {
            message.channel.send(`Args: ${args}`)
        }

	},
};


// {
//     const channelName = args.join('-')
//     message.guild.channels
//         .create(channelName, {
//             type: 'text',
//         })
//         .then((channel) => {
//             console.log(channel)
//             message.channel.send(`Channel created`)
//         })
// }