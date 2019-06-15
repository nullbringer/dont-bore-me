module.exports = {
  Query: {
    activity: (_, { type }, { dataSources }) =>
      dataSources.activityAPI.getActivityByType({ type: type }),


    user: async (_, { userId }, { dataSources }) => {
      const userdata = await dataSources.userAPI.getUser({ userId });
      
      const dataToReturn = userdata.map(({ activityKey }) =>
        dataSources.activityAPI.getActivityByKey(activityKey),
      );

      return {
        userId: userId,
        activities: dataToReturn,
      };
    },
  },

  Mutation: {

    saveActivityForUser: async (_, { userId, activityKey }, { dataSources }) => {

      await dataSources.userAPI.saveUser({ userId, activityKey });
      const userdata = await dataSources.userAPI.getUser({ userId });
      const dataToReturn = userdata.map(({ activityKey }) =>
        dataSources.activityAPI.getActivityByKey(activityKey),
      );

      return {
        userId: userId,
        activities: dataToReturn,
      };

    },
  	createUser: async (_, { userId }, { dataSources }) => {
      await dataSources.userAPI.createUser({ userId});
     
    },
    updateUser: async (_, { userId,activity,accessibility,type,participants,price,key }, { dataSources }) => {
      await dataSources.userAPI.updateUser({ userId,activity,accessibility,type,participants,price,key});
     
    }
  	 
  }
};


