const { gql } = require('apollo-server');

const typeDefs = gql`

type Query {
  activities: [Activity]!
  activity(type: String!): Activity
  

  
}

type Mutation {
    createUser(userId: String): User # login token
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