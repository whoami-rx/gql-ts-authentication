import * as bcrypt from 'bcryptjs'
import { User } from './entity/User'
import { IResolverMap } from './types/ResolverType'

const resolvers: IResolverMap = {
  Query: {
    hello: () => 'Hello, world'
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
    login: async (_, { input: { email, password } }) => {
      try {
        const user = await User.findOne({ email })
        if (!user) return null
        const valid = await bcrypt.compare(password, user.password)
        return valid ? user : null
      } catch (e) {
        console.log(e)
        return null
      }
    }
  }
}

export default resolvers
