const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IdeaSchema = new Schema({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'post'
  }]
});

IdeaSchema.statics.addPost = function(id, content) {
  const Post = mongoose.model('post');

  return this.findById(id)
    .then(idea => {
      const post = new Post({ content, idea })
      idea.posts.push(post)
      return Promise.all([post.save(), idea.save()])
        .then(([post, idea]) => idea);
    });
}

IdeaSchema.statics.findPosts = function(id) {
  return this.findById(id)
    .populate('posts')
    .then(idea => idea.posts);
}

mongoose.model('idea', IdeaSchema);
