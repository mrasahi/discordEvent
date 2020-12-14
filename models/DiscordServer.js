const { model, Schema } = require('mongoose')

const DiscordServer = new Schema({
  _id: String,
  serverid: String,
  wam: Array,
  structuredeck: Array,
  speedduel: Array,
  duellinks: Array,
  giantcard: Array,
  wamcategory: String,
  structuredeckcategory: String,
  speedduelcategory: String,
  duellinkscategory: String,
  giantcardcategory: String,
  eventEnd: Boolean
}, {strict: false})

module.exports = model('DiscordServer', DiscordServer)