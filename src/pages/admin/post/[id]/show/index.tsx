import { getServerSession } from 'next-auth'
import { GetServerSidePropsContext } from 'next/types'
import ShowPost from 'src/@core/components/post/showPost'
import { setToken } from 'src/lib/membership/axios'
import { getShowPost } from 'src/lib/post/showPost'
import { options } from 'src/pages/api/auth/options'
import { ShowPostType } from 'src/types/post'


function ShowPostPage(props: ShowPostType) {
    return (
        <ShowPost post={props.post}/>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const id = context?.params?.id;
        const session : any = await getServerSession(context.req, context.res, options);
        const token = session?.myToken;
        setToken(token)
        const post = await getShowPost(id)

        return {
            props: {
                post: post
            }
        }
    } catch (error) {
         return {
            props: {
                error: 'error in the show post '
            }
         }
    }
}

export default ShowPostPage
