import { ApolloServer } from 'apollo-server-express'
import * as express from 'express'
import typeDefs from './schema'
import resolvers from './resolvers'
import { createConnection } from 'typeorm'

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })
  const app = express()
  server.applyMiddleware({ app })
  try {
    await createConnection()
    app.listen({ port: 4000 }, () => {
      console.log('Server ready at 4000')
    })
  } catch (e) {
    console.log(e)
  }
}

startServer()
