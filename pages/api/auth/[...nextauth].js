import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from 'axios'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const providers = [
  Providers.Credentials({
    name: 'Credentials',
    authorize: async (credentials) => {
      try {
        const Users = await prisma.user.findUnique({
            where:{
              email:credentials.email
            }
          })
          if (Users) {
            let data = {
              user:Users
            }
            return {status: 'success', data: data.user}
          
          }else{
            return null
          }
        // } 
      } catch (e) {
        const errorMessage = e.response.data.message
        // Redirecting to the login page with error messsage in the URL
        throw new Error(errorMessage + '&email=' + credentials.email)
      }

    }
  })
]

const callbacks = {
  async jwt(token, user,account, profile, isNewUser) {
    if (user) {
      token.accessToken = 'user.data.token'
      user && (token.user = user);
      // token.name = user.data.name
      // token.email = user.data.email
      // if(user?.data?.isFirstTimeLogin){
      //   token.user.isFirstTimeLogin = user?.data?.isFirstTimeLogin
      // }
    }

    return token
  },

  async session(session, user, sessionToken) {
    session.accessToken = user.accessToken
    session.user = user.user;
    return session
  }
}

const options = {
  providers,
  callbacks,
  site: 'https://dev.provenpci.com:3000',
  pages: {
    error: '/login' // Changing the error redirect page to our custom login page
  }
}

export default (req, res) => NextAuth(req, res, options)