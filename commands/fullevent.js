const Discord = require('discord.js');
const client = new Discord.Client()
const fs = require('fs')
const path = require('path')


module.exports = {
	name: 'fullevent',
    description: 'View all events with max players',
    args: false,
    usage: '<user> <role>',
	execute(message, args) {
        let eventRaw = fs.readFileSync(__dirname + '/events/events.json')
        let eventData = JSON.parse(eventRaw)
        console.log(eventData)
        // message.channel.send(`There are a total of ${total} events.\nWin-A-Mat: ${eventData.wam}\nStructure Deck: ${eventData.structuredeck}\nSpeed Duel: ${eventData.speedduel}\nDuel Links: ${eventData.duellinks}\nGiant Card: ${eventData.giantcard}`)
	},
};