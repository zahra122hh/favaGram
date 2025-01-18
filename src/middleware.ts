import { withAuth } from 'next-auth/middleware'

export default withAuth(
   async function middleware(req) {
    // console.log(req)
   },
   {
    callbacks: {
      authorized: ({token}) => {
        return Boolean(token?.apiToken)
      }
    },
    pages: {
      signIn: '/membership/sendcode',
      error: '/401'
    }
   }
)


export const config = {
  matcher: ['/admin/:path*']
}


