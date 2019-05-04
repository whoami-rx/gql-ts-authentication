import * as bcrypt from 'bcryptjs'
import { User } from './entity/User'
import { IResolverMap } from './types/ResolverType'

const resolvers: IResolverMap = {
  Query: {
    me: async (_, __, { req }) => {
      const userId = req.session.userId
      if (!userId) return null
      try {
        const me = await User.findOne({ id: userId })
        return me
      } catch (_) {
        return null
      }
    }
  },
  Mutation: {
    register: async (_, { input: { email, password } }) => {
      const hashPassword = await bcrypt.hash(password, 10)
      try {
        await User.create({
          email,
          password: hashPassword
        }).save()
        return true
      } catch (_) {
        console.log('Fail to register user')
        return false
      }
    },
    login: async (_, { input: { email, password } }, { req }) => {
      try {
        const user = await User.findOne({ email })
        if (!user) return null
        const valid = await bcrypt.compare(password, user.password)
        if (!valid) {
          return null
        }
        req.session.userId = user.id
        return user
      } catch (e) {
        console.log(e)
        return null
      }
    }
  }
}

export default resolvers
