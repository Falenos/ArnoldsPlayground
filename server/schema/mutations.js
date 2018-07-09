const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Idea = mongoose.model('idea');
const Post = mongoose.model('post');
const IdeaType = require('./idea_type');
const PostType = require('./post_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addIdea: {
      type: IdeaType,
      args: {
        title: { type: GraphQLString }
      },
      resolve(parentValue, { title }) {
        return (new Idea({ title })).save()
      }
    },
    addPostToIdea: {
      type: IdeaType,
      args: {
        content: { type: GraphQLString },
        ideaId: { type: GraphQLID }
      },
      resolve(parentValue, { content, ideaId }) {
        return Idea.addPost(ideaId, content);
      }
    },
    likePost: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Post.like(id);
      }
    },
    deleteIdea: {
      type: IdeaType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Idea.remove({ _id: id });
      }
    }
  }
});

module.exports = mutation;
