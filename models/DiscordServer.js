const { model, Schema } = require('mongoose')

const DiscordServer = new Schema({
  _id: String,
  serverid: String,
  wam: Array,
  wamex: Array,
  structure: Array,
  speed: Array,
  links: Array,
  giant: Array,
  wamcategory: String,
  wamexcategory: String,
  structurecategory: String,
  speedcategory: String,
  linkscategory: String,
  giantcategory: String,
  eventEnd: Boolean,
  uniqueplayer: String,
}, {strict: false})

module.exports = model('DiscordServer', DiscordServer)