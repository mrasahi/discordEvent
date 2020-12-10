const token = require('./token' || './token.test')

if (token === '') {
    console.log('Please enter a bot token')
    return
}

console.log(token)