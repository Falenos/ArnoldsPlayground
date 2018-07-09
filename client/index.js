import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import IdeaList from './components/IdeaList.js'

const client = new ApolloClient({});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <IdeaList />
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
