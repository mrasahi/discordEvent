module.exports = {
	name: 'addplayer',
    description: 'Adds a player to an event',
    args: true,
    usage: '<user> <role>',
	execute(message, args) {
        const member = message.mentions.members.first();
        let playerlist = []
        playerlist.push(member.user.username)
        message.channel.send(`List of players: \n${playerlist}`)
	},
};
