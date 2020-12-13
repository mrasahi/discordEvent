const Discord = require('discord.js');
const client = new Discord.Client()
const DiscordServer = require('../models/DiscordServer.js')


module.exports = {
    name: 'fullevent',
    description: 'View all events with max players',
    args: false,
    usage: '<user> <role>',
    execute(message, args) {
        DiscordServer.findById(message.guild.id)
            .then(result => {

                // Events funciton
                const eachEvent = (eventName, eventData) => {
                    if (eventData.length === 0) {
                        return (`${eventName}: 0`)
                    } else {
                        let allEvents = eventData.map(event => `${Object.keys(event)}: ${Object.values(event)}`)
                        return {
                            data: `${eventName} events: ${eventData.length}\n------------------------------\n${allEvents.join('\n')}\n==============================\n`,
                            count: eventData.length
                        }
                    }
                }

                let wam = eachEvent(`Win-A-Mat`, result.wam)
                let structure = eachEvent(`Structure Deck`, result.structuredeck)
                let speed = eachEvent(`Speed Duels`, result.speedduel)
                let links = eachEvent(`Duel Links`, result.duellinks)
                let giant = eachEvent(`Giant Card`, result.giantcard)

                console.log(wam)
                console.log(structure)
                console.log(speed)                
                console.log(links)
                console.log(giant)

                message.channel.send(wam.data + structure.data)


                // // All Events Total
                // message.channel.send(`Total Events: ${result.wam.length + result.structuredeck.length + result.speedduel.length + result.duellinks.length + result.giantcard.length}\n------------------------------`)

                // // WAM events
                // if (result.wam.length === 0) {
                //     message.channel.send(`WAM events: 0`)
                // } else {
                //     let allWam = result.wam.map(wam => `${Object.keys(wam)}: ${Object.values(wam)}`)
                //     message.channel.send(`WAM events: ${result.wam.length}\n------------------------------\n${allWam.join('\n')}`)
                // }

                // // Structure Events
                // if (result.structuredeck.length === 0) {
                //     message.channel.send(`Strucure Deck events: 0\n------------------------------`)
                // } else {
                //     let allStructure = result.structuredeck.map(structuredeck => `${Object.keys(structuredeck)}: ${Object.values(structuredeck)}`)
                //     message.channel.send(`Structure Deck events: ${result.structuredeck.length}\n------------------------------\n${allStructure.join('\n')}`)
                // }

                // // Speed Events
                // if (result.speedduel.length === 0) {
                //     message.channel.send(`Strucure events: 0\n------------------------------`)
                // } else {
                //     let allSpeed = result.speedduel.map(speedduel => `${Object.keys(speedduel)}: ${Object.values(speedduel)}`)
                //     message.channel.send(`Speed Duel events: ${result.speedduel.length}\n------------------------------\n${allSpeed.join('\n')}`)
                // }

                // // Links Events
                // if (result.duellinks.length === 0) {
                //     message.channel.send(`Duel Links events: 0\n------------------------------`)
                // } else {
                //     let allLinks = result.duellinks.map(duellinks => `${Object.keys(duellinks)}: ${Object.values(duellinks)}`)
                //     message.channel.send(`Duel Links events: ${result.duellinks.length}\n------------------------------\n${allLinks.join('\n')}`)
                // }

                // // Giant Events
                // if (result.giantcard.length === 0) {
                //     message.channel.send(`Giant Card events: 0\n------------------------------`)
                // } else {
                //     let allGiant = result.giantcard.map(giantcard => `${Object.keys(giantcard)}: ${Object.values(giantcard)}`)
                //     message.channel.send(`Giant Card events: ${result.giantcard.length}\n------------------------------\n${allGiant.join('\n')}`)
                // }
            })
            .catch(err => {
                console.log(err)
                message.channel.send('An error has occured reading the database')
            })

    },
};