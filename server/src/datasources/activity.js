const { RESTDataSource } = require('apollo-datasource-rest');

class ActivityAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://www.boredapi.com/api/';
  }

  activityReducer(response) {

    return {
      activity: response.activity,
      accessibility: response.accessibility,
      type: response.type,
      participants: response.participants,
      price: response.price,
      key: response.key 
    };
  }



  async getActivityByKey(key) {

      const response = await this.get('activity', { key: key });
      return this.activityReducer(response);
  }

  async getActivityByType({ type }) {

      const response = await this.get('activity', { type: type });
      return this.boredReducer(response);
  }

  async getActivityByPrice({ price }) {

      //console.log(price);
      const response = await this.get('activity', {minprice: 0 ,maxprice: price });

      //console.log(response);
      return this.activityReducer(response);
  }

}

module.exports = ActivityAPI;