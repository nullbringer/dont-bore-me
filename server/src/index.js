const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');



// const BoredAPI = require('./datasources/launch');

const ActivityAPI = require('./datasources/activity');

const UserAPI = require('./datasources/user');

const GiphyAPI = require('./datasources/giphy');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    activityAPI: new ActivityAPI(),
    userAPI: new UserAPI(),
    giphyAPI: new GiphyAPI()
  })
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});


