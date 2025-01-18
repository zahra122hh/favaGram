import CredentialsProvider from 'next-auth/providers/credentials'
import { login } from 'src/lib/membership/login'


export const options = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials:{ 
        username: { label: "Username", type: "text", placeholder: "jsmith" },
      },
      async authorize(credentials) {
        try {
          const response = await login({ username: credentials?.username })

          const infoData: any = response?.data

          console.log(infoData, 'test')

          if (infoData) {

            return {
              ...infoData,
              apiToken: infoData?.token
            }
          } else {
            throw new Error('error in response data')
          }
        } catch (error) {
          throw error
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token?.user
      session.myToken = token?.apiToken

      return { ...session, ...token }
    },
    async jwt({ user, token }) {
      if (user) {
        return { ...user, ...token }
      }

      return { ...token }
    },
  },
  pages: {
    singIn: '/membership/sendcode'
  },
  session: {
    maxAge: 60 * 60 * 2
  }
}
