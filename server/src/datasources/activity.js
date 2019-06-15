const { RESTDataSource } = require('apollo-datasource-rest');

class ActivityAPI extends RESTDataSource {
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



  async getActivityByKey(key) {

      const response = await this.get('activity', { key: key });
      return this.boredReducer(response);

    // const res = await this.get(`/movie/${id}/credits`);
    // return res ? res.cast : [];
  }

  async getActivityByType({ type }) {

      const response = await this.get('activity', { type: type });
      return this.boredReducer(response);
  }

}

module.exports = ActivityAPI;