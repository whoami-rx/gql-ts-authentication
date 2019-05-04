import { ApolloServer } from 'apollo-server-express'
import * as express from 'express'
import typeDefs from './schema'
import resolvers from './resolvers'
import { createConnection } from 'typeorm'
import * as session from 'express-session'

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
  })
  const app = express()
  app.use(
    session({
      secret: 'best_secret',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 3600000,
        expires: new Date(Date.now() + 3600000)
      }
    })
  )
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
