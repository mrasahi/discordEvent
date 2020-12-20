const Discord = require('discord.js');
const client = new Discord.Client()
const DiscordServer = require('../models/DiscordServer.js')

module.exports = {
    name: 'testsetup',
    description: 'Test refactor of setup.js',
    args: false,
    usage: '<user> <role>',
    execute(message, args) {

        DiscordServer.findById(message.guild.id)
            .then(result => {
                if (result) {
                    // console.log(`server exists in db. returning`)
                    message.channel.send(`Server ID has already been saved`)
                    return
                }


                async function createChannel(eventName, eventDb) {
                    // console.log(`will create ${eventName.toLowerCase()} in ${eventDb}`)
                    let categoryID = await message.guild.channels.create(eventName.toLowerCase(), { type: 'category', })
                        .then(res => {
                            // console.log(res.id)
                            // message.channel.send(res.id)
                            return res.id
                        })
                        .catch(err => {
                            console.log(err)
                            message.channel.send(`An error has occured creating category ${eventName}`)
                        })
                    return categoryID
                }

                async function createUnique() {
                    let uniqueID = await message.guild.roles.create({
                        data: {
                            name: `Player`,
                            color: 'db23b5',
                        },
                        reason: 'Unique player count role',
                    })
                        .then(result => {
                            return result.id
                        })
                        .catch(err => console.log(err))
                    return uniqueID
                }

                async function testCreater() {
                    message.channel.send('Setup in progress...')
                    let unique = await createUnique()
                    let wam = await createChannel('Win-A-Mat', 'wam')
                    let wamex = await createChannel('Win-A-Mat-ex', 'wamex')
                    let structure = await createChannel('Structure-Deck', 'structure')
                    let speed = await createChannel('Speed-Duel', 'speed')
                    let links = await createChannel('Duel-Links', 'links')
                    let giant = await createChannel('Giant-Card', 'giant')
                    let currentServer = new DiscordServer({
                        _id: message.guild.id,
                        serverid: message.guild.id,
                        wam: [],
                        wamex: [],
                        structuredeck: [],
                        speed: [],
                        links: [],
                        giant: [],
                        wamcategory: wam,
                        wamexcategory: wamex,
                        structurecategory: structure,
                        speedcategory: speed,
                        linkscategory: links,
                        giantcategory: giant,
                        eventEnd: false,
                        uniqueplayer: unique
                    })
                    currentServer.save()
                        .then(result => {
                            // console.log(result)
                            message.channel.send('Setup complete. ')
                        })
                        .catch(err => {
                            console.log(err)
                            message.channel.send('Error. Server ID has already been saved')
                        })
                }

                testCreater()

                        
            })
            .catch(err => console.log(err))

    },
};
