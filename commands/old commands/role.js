module.exports = {
	name: 'role',
    description: 'role assign',
    args: true,
    usage: '<user> <role>',
	execute(message, args) {
        const role = message.guild.roles.cache.find(role => role.name === args[1])
        const member = message.mentions.members.first();
        if (member.roles.cache.some(role => role.name === args[1])) {
            message.channel.send(`${member} is already assigned to ${role}`)
            return
        }
        member.roles.add(role)
        // console.log(role.members.map(members => members.user.tag))
		message.channel.send(`${role} has been assigned to ${member}`);
	},
};
