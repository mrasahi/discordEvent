const fs = require('fs')
const path = require('path')
let countRaw = fs.readFileSync(__dirname + '/count.json')
let countData = JSON.parse(countRaw)


module.exports = {
	name: 'count',
    description: 'simple counter.',
    args: false,
    guildOnly: false,
    // cooldown: 3,
	execute(message, args) {
        let countRaw = fs.readFileSync(__dirname + '/count.json')
        let countData = JSON.parse(countRaw)
        if (args[0] === 'add') {
            countData.count++
            console.log(countData)
            fs.writeFileSync(__dirname + '/count.json', JSON.stringify(countData))
            message.channel.send(`add`)
        } else if (args[0] === 'sub') {
            countData.count--;
            fs.writeFileSync(__dirname + '/count.json', JSON.stringify(countData))
            message.channel.send(`sub`)
        } else {
            console.log(countData)
            message.channel.send(`Count: ${countData.count}`)
        }
    },
};