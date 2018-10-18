const mongoose = require('mongoose')

const { Schema } = mongoose

const ArticleSchema = new Schema({
  title: String,
  body: String,
  author: String
}, {timaStamps: true})


ArticleSchema.methods.toJSON = () => ({
  _id: this._id,
  title: this.title,
  body: this.body,
  author: this.author,
  createdAt: this.createdAt,
  updatedAt: this.updatedAt
})

mongoose.model('Articles', ArticlesSchema)