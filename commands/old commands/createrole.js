module.exports = {
	name: 'createrole',
    description: 'create a role',
    args: true,
    usage: '<user> <role>',
	execute(message, args) {
        message.guild.roles.create({
            data: {
              name: `${args}`,
              color: 'BLUE',
            },
            reason: 'Win-A-Mat event created',
          })
            .then((role) => {
                console.log(role)
                message.channel.send(`Role ${args} has been created`)
            })
            .catch(err => {
                console.log(err)
                message.channel.send(`An error has occured creating a role`)
            })

	},
};
