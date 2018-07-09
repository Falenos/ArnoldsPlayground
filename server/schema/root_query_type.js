const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const IdeaType = require('./idea_type');
const PostType = require('./post_type');
const Post = mongoose.model('post');
const Idea = mongoose.model('idea');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    ideas: {
      type: new GraphQLList(IdeaType),
      resolve() {
        return Idea.find({});
      }
    },
    idea: {
      type: IdeaType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Idea.findById(id);
      }
    },
    post: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnetValue, { id }) {
        return Post.findById(id);
      }
    }
  })
});

module.exports = RootQuery;
