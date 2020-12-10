const Discord = require('discord.js');
const client = new Discord.Client()
const fs = require('fs')
const path = require('path')


module.exports = {
    name: 'addwam',
    description: 'Add a new Win-A-Mat event',
    args: false,
    usage: '<user> <role>',
    execute(message, args) {

        let eventRaw = fs.readFileSync(__dirname + '/events/events.json')
        let eventData = JSON.parse(eventRaw)


        message.channel.send('How many players are in this event?').then(() => {
            const filter = m => message.author.id === m.author.id;

            message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                .then(messages => {
                    if (messages.first().content >= 0) {
                        eventData.wam++;
                        fs.writeFileSync(__dirname + '/events/events.json', JSON.stringify(eventData))
                        message.channel.send(`${messages.first().content} players will be in this event`)
                        message.guild.channels
                        .create(`win-A-Mat-${eventData.wam}`, {
                            type: 'text',
                        })
                        .then((channel) => {
                            // console.log(channel)
                            message.channel.send(`Channel win-A-Mat-${eventData.wam} has been created.\nTotal WAM events: ${eventData.wam}`)
                            
                        })
                        .catch(err => {
                            console.log(err)
                            message.channel.send('An error has occured creating a new channel.')
                        })
                    } else {
                        message.channel.send(`The value must be a valid number.\nNo changes have been made.`);
                    }
                })
                .catch(() => {
                    message.channel.send('An error or a time out has occured.');
                });
        });

    },
};
