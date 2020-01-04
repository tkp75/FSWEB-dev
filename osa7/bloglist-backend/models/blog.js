const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const blogSchema = mongoose.Schema({
  title:    { type: String, required: true },
  author:   { type: String, required: true },
  url:      { type: String, unique:   true },
  likes:    { type: Number },
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: { type: [String], required: false },
})

blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)