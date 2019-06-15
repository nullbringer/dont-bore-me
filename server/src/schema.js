const { gql } = require('apollo-server');

const typeDefs = gql`

type Query {
  activities: [Activity]!
  activity(type: String!): Activity
  

  
}

type Mutation {
    createUser(userId: String): User # login token
    updateUser(userId: String,activity:String,accessibility:Float
    ,type:String,participants:Int,price:Float,key:String ): User
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
	userId : String
}


`;

module.exports = typeDefs;