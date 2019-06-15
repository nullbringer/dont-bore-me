module.exports = {
  Query: {
    activity: (_, { type }, { dataSources }) =>
      dataSources.boredAPI.getBoredById({ type: type })
  },

  Mutation: {
  	createUser: async (_, { userId }, { dataSources }) => {
      await dataSources.userAPI.createUser({ userId});
     
    }
  	 
  }
};