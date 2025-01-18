import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { GetServerSidePropsContext } from 'next/types'
import CardPost from 'src/@core/components/post/IndexCard'
import { setToken } from 'src/lib/membership/axios'
import { getAllPost } from 'src/lib/post/indexPost'
import { options } from 'src/pages/api/auth/options'
import { ListPostsProps, SessionType } from 'src/types/post'


function Index(props: ListPostsProps) {
  return (
    <>
      <Box>
        <Link href={`/admin/post/createPost`}>
          <Button size='medium' variant='contained' color='primary' sx={{ m: 4 }}>
            ایجاد پست جدید
          </Button>
        </Link>
      </Box>
      <Box>
        <CardPost posts={props.posts} />
      </Box>
    </>
  )
}
export default Index;


export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const session: SessionType = await getServerSession(context.req, context.res, options)
    const token = session?.myToken
    setToken(token)

    const posts = await getAllPost()


    return {
      props: {
        posts: posts
      }
    }
  } catch (error) {
    return {
      props: {
        error: 'error in the index page '
      }
    }
  }
}