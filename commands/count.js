// module.exports = {
// 	name: 'count',
// 	description: 'simple counter.',
// 	execute(message, args) {
// 		message.channel.send(`Count: ${count}`);
// 	},
// };

module.exports = {
	name: 'count',
    description: 'simple counter.',
    args: true,
	execute(message, args) {
        let count = 0
        if (args[0] === 'add') {
            count++;
            message.channel.send(`add`)
        } else if (args[0] === 'sub') {
            count--;
            message.channel.send(`sub`)
        } else {
            message.channel.send(`Count: ${count}`)
        }
    },
};