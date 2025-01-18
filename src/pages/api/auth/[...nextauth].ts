import NextAuth from 'next-auth/next'
import { options } from 'src/pages/api/auth/options'

export default async function resolver(req, res) {
  const handler = await NextAuth(options)
  await handler(req, res)
}

export { resolver as GET, resolver as POST }



