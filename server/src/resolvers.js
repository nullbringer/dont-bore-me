module.exports = {
  Query: {
    activity: (_, { type }, { dataSources }) =>
      dataSources.boredAPI.getBoredById({ type: type })
  },

  Mutation: {
  	createUser: async (_, { userId }, { dataSources }) => {
      await dataSources.userAPI.createUser({ userId});
     
    },
    updateUser: async (_, { userId,activity,accessibility,type,participants,price,key }, { dataSources }) => {
      await dataSources.userAPI.updateUser({ userId,activity,accessibility,type,participants,price,key});
     
    }
  	 
  }
};