module.exports = {
  Query: {
    activity: (_, { type }, { dataSources }) =>
      dataSources.activityAPI.getActivityByType({ type: type }),

    activityByPrice: (_, { price }, { dataSources }) =>
      dataSources.activityAPI.getActivityByPrice({ price: price }),

    gifById: (_, { search }, { dataSources }) =>
      dataSources.giphyAPI.getGifById({ search: search }),  


    user: async (_, { userId }, { dataSources }) => {
      const userdata = await dataSources.userAPI.getUser({ userId });
      
      userdata.reverse();
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

    }
  	 
  }
};


