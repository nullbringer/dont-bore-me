const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');



const BoredAPI = require('./datasources/launch');
const { createStore } = require('./utils');
const UserAPI = require('./datasources/user');

const store = createStore();






const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    boredAPI: new BoredAPI(),
    userAPI: new UserAPI({ store })
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});


