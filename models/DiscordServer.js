const { model, Schema } = require('mongoose')

const DiscordServer = new Schema({
  _id: String,
  serverid: String,
  wam: Number,
  structuredeck: Number,
  speedduel: Number,
  duellinks: Number,
  giantcard: Number
}, {strict: false})

module.exports = model('DiscordServer', DiscordServer)