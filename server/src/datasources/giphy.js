const { RESTDataSource } = require('apollo-datasource-rest');

class GiphyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.giphy.com/v1/gifs/';
  }




gifReducer(response) {

  return {
    image_url:response
  };
}



async getGifById({ search }) {
  //console.log(search)
  const response = await this.get('search', { api_key: "Ky0tspF0p3JZsGCSt5D25iD11Q4rX0oB",limit : 1,
  q:search });
  //console.log(response.data[0].images.original.url)

  return this.gifReducer(response.data[0].images.original.url);
}


}


module.exports = GiphyAPI;