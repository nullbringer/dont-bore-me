module.exports = {
  Query: {
    activity: (_, { type }, { dataSources }) =>
      dataSources.boredAPI.getBoredById({ type: type })
  },

  Mutation: {
  	createUser: async (_, { userId }, { dataSources }) => {
      dataSources.userAPI.createUser({ userId });
    }
  	 
  }
};