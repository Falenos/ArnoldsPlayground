const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Post = mongoose.model('post');

const PostType = new GraphQLObjectType({
  name:  'PostType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    idea: {
      type: require('./idea_type'),
      resolve(parentValue) {
        return Post.findById(parentValue).populate('idea')
          .then(post => {
            console.log(post)
            return post.idea
          });
      }
    }
  })
});

module.exports = PostType;
