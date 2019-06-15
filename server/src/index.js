const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');



const BoredAPI = require('./datasources/launch');

const UserAPI = require('./datasources/user');








const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    boredAPI: new BoredAPI(),
    userAPI: new UserAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});


