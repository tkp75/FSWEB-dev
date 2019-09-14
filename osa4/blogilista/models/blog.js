const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const blogSchema = mongoose.Schema({
  title:  { type: String, required: true },
  author: { type: String, required: true },
  url:    { type: String, unique:   true },
  likes:  { type: Number }
})
blogSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Blog', blogSchema)