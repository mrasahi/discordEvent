module.exports = {
	name: 'makashi',
    description: 'He lives...',
    args: false,
	execute(message, args) {
		message.channel.send('I live');
	},
};