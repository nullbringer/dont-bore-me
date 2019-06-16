const { gql } = require('apollo-server');

const typeDefs = gql`

type Query {
  activities: [Activity]!
  activity(type: String!): Activity
  user(userId: String!):User
  activityByPrice(price: Float!):Activity
  gifById(search : String):Gif
  

  
}

type Mutation {
    createUser(userId: String): User # login token
    updateUser(userId: String,activity:String,accessibility:Float
    ,type:String,participants:Int,price:Float,key:String ): User
    saveActivityForUser(userId: String, activityKey:String):User
  }


type Activity {
  activity: String
  accessibility: Float
  type: String
  participants: Int
  price: Float
  key: String
}

type User {
	userId : String,
  activities: [Activity]
}

type Gif {
  image_url : String
}


`;

module.exports = typeDefs;