const express = require('express');
const { ApolloServer, authMiddleware  } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const {ApolloServerPluginLandingPageGraphQLPlayground} = require("apollo-server-core");

const startServer = async () => {
  // create a new Apollo server and pass in our schema data
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: authMiddleware,
    plugins: [

      ApolloServerPluginLandingPageGraphQLPlayground(),
  
    ],
  });

  //start the Apollo server
  await server.start();

  //integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });

  //log wherr we can go to test our GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
};

//initialize the server
startServer();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
