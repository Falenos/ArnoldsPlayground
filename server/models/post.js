const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  idea: {
    type: Schema.Types.ObjectId,
    ref: 'idea'
  },
  likes: { type: Number, default: 0 },
  content: { type: String }
});

PostSchema.statics.like = function(id) {
  const Post = mongoose.model('post');

  return Post.findById(id)
    .then(post => {
      ++post.likes;
      return post.save();
    })
}

mongoose.model('post', PostSchema);
