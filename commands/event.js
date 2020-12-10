const Discord = require('discord.js');
const client = new Discord.Client()
const fs = require('fs')
const path = require('path')


module.exports = {
	name: 'event',
    description: 'View events',
    args: false,
    usage: '<user> <role>',
	execute(message, args) {
        let eventRaw = fs.readFileSync(__dirname + '/events/events.json')
        let eventData = JSON.parse(eventRaw)
        console.log(eventData)
        let total = Object.values(eventData).reduce(( accumulator, currentValue ) => accumulator + currentValue, 0)
        console.log(total)
        message.channel.send(`There are a total of ${total} events.\nWin-A-Mat: ${eventData.wam}\nStructure Deck: ${eventData.structuredeck}\nSpeed Duel: ${eventData.speedduel}\nDuel Links: ${eventData.duellinks}\nGiant Card: ${eventData.giantcard}`)
	},
};