const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const PostType = require('./post_type');
const Idea = mongoose.model('idea');

const IdeaType = new GraphQLObjectType({
  name:  'IdeaType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parentValue) {
        return Idea.findPosts(parentValue.id);
      }
    }
  })
});

module.exports = IdeaType;
