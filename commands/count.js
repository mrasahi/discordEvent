module.exports = {
	name: 'count',
	description: 'simple counter.',
	execute(message, args) {
		message.channel.send(`Count: ${count}`);
	},
};