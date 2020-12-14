const { model, Schema } = require('mongoose')

const DiscordServer = new Schema({
  _id: String,
  serverid: String,
  wam: Array,
  wamex: Array,
  structuredeck: Array,
  speedduel: Array,
  duellinks: Array,
  giantcard: Array,
  wamcategory: String,
  wamexcategory: String,
  structuredeckcategory: String,
  speedduelcategory: String,
  duellinkscategory: String,
  giantcardcategory: String,
  eventEnd: Boolean,
  uniqueplayer: String,
}, {strict: false})

module.exports = model('DiscordServer', DiscordServer)