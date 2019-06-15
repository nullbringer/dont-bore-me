const { RESTDataSource } = require('apollo-datasource-rest');

class BoredAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://www.boredapi.com/api/';
  }




boredReducer(activity) {

  return {
    activity: activity.activity,
  	accessibility: activity.accessibility,
  	type: activity.type,
  	participants: activity.participants,
  	price: activity.price,
  	key: activity.key 
  };
}



async getBoredById({ type }) {
  const response = await this.get('activity', { type: type });
  return this.boredReducer(response);
}

getBoredByIds({ types }) {
  return Promise.all(
    types.map(type => this.getBoredById({ type })),
  );
}
}


module.exports = BoredAPI;