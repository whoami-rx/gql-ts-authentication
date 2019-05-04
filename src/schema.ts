import { gql } from 'apollo-server-express'

export default gql`
  type User {
    id: ID!
    email: String!
  }
  type Query {
    hello: String!
  }
  input userInput {
    email: String!
    password: String!
  }
  type Mutation {
    register(input: userInput): Boolean!
    login(input: userInput): User
  }
`
