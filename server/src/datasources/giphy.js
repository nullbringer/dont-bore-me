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
  const response = await this.get('search', { api_key: "xxx",limit : 5,rating:"G",lang:"en",
  q:search });
  //console.log(response.data[0].images.original.url)
  var min=0; 
  var max=5;  
  var random =Math.floor(Math.random() * (+max - +min)) + +min; 

  return this.gifReducer(response.data[random].images.original.url);
}


}


module.exports = GiphyAPI;