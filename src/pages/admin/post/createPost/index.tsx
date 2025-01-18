import { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import CardCreatePost from 'src/@core/components/post/createPost'
import { GetServerSidePropsContext } from 'next/types'
import { getServerSession } from 'next-auth'
import { options } from 'src/pages/api/auth/options'
import { setToken } from 'src/lib/membership/axios'
import { getTag } from 'src/lib/post/tag'

import { TagType } from 'src/types/post'

function CreatePost(props: TagType) {
  return <CardCreatePost tags={props.tags}/>
}

export default CreatePost

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const session: any = await getServerSession(context.req, context.res, options)
    const token = session?.myToken
    setToken(token)

    const tags = await getTag()

    console.log(tags, 'tags ')

    return {
      props: {
        tags: tags
      }
    }
  } catch (error) {
    return {
      props: {
        error: 'error tag '
      }
    }
  }
}
