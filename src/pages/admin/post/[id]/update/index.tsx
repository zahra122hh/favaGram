import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next/types";
import UpdatePost from 'src/@core/components/post/updatePost';
import { setToken } from "src/lib/membership/axios";
import { getShowPost } from "src/lib/post/showPost";
import { getTag } from "src/lib/post/tag";
import { options } from "src/pages/api/auth/options";
import { SessionType, UpdateType } from "src/types/post";

function UpdatePostPage(props: UpdateType) {
  return (
    <UpdatePost post={props?.post}/>
  )

}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const id = context?.params?.id;
        console.log(id)
        const session : SessionType = await getServerSession(context.req, context.res, options)
        const token = session?.myToken
        console.log(token)
        setToken(token)

        const tags = await getTag();
        const post = await getShowPost(id)

       
        return {
            props: {
                post: {
                    post: post,
                    tags: tags
                }
            }
        }
    } catch (error) {
        return {
            props: {
                error: 'error in page update '
            }
        }
    }
}

export default UpdatePostPage