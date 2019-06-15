const { gql } = require('apollo-server');

const typeDefs = gql`

type Query {
  activities: [Activity]!
  activity(type: String!): Activity
  user(userId: String!):User
  

  
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


`;

module.exports = typeDefs;