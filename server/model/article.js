import mongoose from 'mongoose'
import moment from 'moment'
moment.locale('zh-cn')
const Schema = mongoose.Schema

const articleSchema = new Schema({
  // 标题
  title: String,
  // 内容
  content: String,
  // 简介
  // abstract: String,
  // 标签
  // tags: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'tag'
  // }],
  // 文章是否发布
  publish: {
    type: Boolean,
    default: false
  },
  // 创建时间
  createTime: {
    type: Date
  },
  // 最后更新时间
  lastEditTime: {
    type: Date,
    default: Date.now
  }
})
articleSchema.set('toJSON', { getters: true, virtuals: true });
articleSchema.set('toObject', { getters: true, virtuals: true });
articleSchema.path('createTime').get(function (v) {
  return moment(v).format('lll');
});
articleSchema.path('lastEditTime').get(function (v) {
  return moment(v).format('lll');
});

module.exports = mongoose.model('article', articleSchema)
