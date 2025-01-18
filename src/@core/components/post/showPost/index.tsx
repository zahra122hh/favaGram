import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import { Button, IconButton, TextField } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box, { BoxProps } from '@mui/material/Box'
import MuiCard, { CardProps } from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Rating from '@mui/material/Rating'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Icon from 'src/@core/components/icon'
import SwiperAutoSwitch from 'src/@core/components/post/swiper2'
import { commentsPost } from 'src/lib/post/commnts'
import { likePost } from 'src/lib/post/like'
import { getShowPost } from 'src/lib/post/showPost'
import { ShowPostType } from 'src/types/post'


interface DataComment {
      user_id: number;
      body: string;
      model_type: string;
      model_id: number
}


const ChatFormWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  borderRadius: 8,
  alignItems: 'center',
  boxShadow: theme.shadows[1],
  padding: theme.spacing(1.25, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.paper
}))

// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

// Styled Box component
const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  }))

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 1200, height: 700,   margin: '0 auto'  }
}))


const ShowPost = (props: ShowPostType) => {
  const { post } = props;
  const postId = post?.id
  const { data : session }: any = useSession();
  const userId  = session?.user?.id
  const [showSendMsg, setShowSendMsg] = useState<number>()
  const [commentModelType ,setCommentModalType] = useState<string>('')
  const [modelId, setModelId ] = useState<number>()
  const tags = post?.tags.map((tag) => tag?.title).join(',')


  const { register, reset,  handleSubmit, formState: { errors } } = useForm()

  function handleAddComment(id : number , modelType : string) {
      setShowSendMsg(id)
      setModelId(id);
      setCommentModalType(modelType)
  } 


  const queryClient = useQueryClient();

   const { data: postData } = useQuery({
      queryKey: ['post', postId],
      queryFn: async () => {
        const data = await getShowPost(postId);
        return data;
      }  
    })

    console.log(postData, 'query data')

    const mutationLike = useMutation({
      mutationFn: likePost,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['post', postId]
        })
      },
      onError: (error) => {
        console.log('Error like post ', error)
      }
    })

    
  const mutationComment = useMutation({
     mutationFn: commentsPost,
     onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['post', postId],
      })
     },
     onError: (error) => {
      console.log('Error updating post', error)
    },
  })

  const onSubmit = async (data) => {
    try {
      const body : string = data.body;
      const dataComment : DataComment = {
        user_id: userId,
        body: body,
        model_type: commentModelType,
        model_id: modelId,
      }
      console.log(dataComment);
      const comment = await commentsPost(dataComment);
      console.log(comment, 'comment');
      reset();
      mutationComment.mutate(dataComment);
      
    } catch (error) {
      throw error
    }
  }

   
   const handleLike = async (id: number) => {
      const like = await likePost(id)
      console.log(like, 'like test 44')
      mutationLike.mutate(id)
   }


    return (  
      <>
        <Box className='content-center'>
         <Card>
          <Grid container spacing={6}>

            <Grid item xs={12} sm={7}>
              <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5.75, 6.25)} !important` }}>
                <Box
                   className='demo-space-x'
                   sx={{
                     display: 'flex',
                     alignItems: 'center',
                     padding: 2
                   }}
                 >
                   <Avatar src='/images/avatars/8.png' sx={{ width: 40, height: 40 }} alt='Victor Anderson' />
                   <Typography sx={{ marginLeft: 2 }}>{session?.user?.fullname ?? 'name'}</Typography>
                 </Box>

                 <Box
                  className='demo-space-x'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 2
                  }}
                >
                  <Typography variant='h5' sx={{ marginLeft: 2 }}>{post?.title}</Typography>
                </Box>

                 <Box sx={{ mb: 6.5 }}>
                      <SwiperAutoSwitch  files={post?.files}/>
                  </Box>

                  <Divider sx={{ my: theme => `${theme.spacing(7)} !important` }} />

                  <Box
                  className='demo-space-x'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 2,
                  }}
                >
                      <Typography>عنوان: {tags}</Typography>
                </Box>

   
                  <StyledBox>
                  <Grid container spacing={2}>
                  <Grid item xs={9}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                      <Box sx={{ m: 4 }}>
                        <Icon icon='mdi:content-save' fontSize={30}/>
                      </Box>

                      <Box sx={{ m: 4 }}>
                        <Icon icon='mdi:share-variant'fontSize={30} />
                      </Box>

                         <Box sx={{ m: 4 }}>
                             <Icon icon='mdi:comment' fontSize={30} />
                         </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={3}>
                    <Box sx={{ display: 'flex' }}>
                    <Box sx={{ m: 4 }} onClick={() => handleLike(post?.id)}>
                         <Rating
                             precision={1}
                             max={1}
                             size='large'
                             defaultValue={postData?.user_like == true ? 1 : 0 }
                             name='customized-color'
                             sx={{ color: 'error.main' }}
                             icon={<Icon icon='mdi:heart' />}
                             emptyIcon={<Icon icon='mdi:heart' />}
                            />
                        </Box>
                      <Box sx={{ m: 4 }}>
                        <Typography>{postData?.likes_count}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                  </StyledBox>
              </CardContent>
            </Grid>


            <Grid
              item
              sm={5}
              xs={12}
              sx={{ pt: ['0 !important', '1.5rem !important'], pl: ['1.5rem !important', '0 !important'] }}
            >
          <Box
           sx={{
             display: 'flex',
             flexDirection: 'column',
             height: '700px', 
                    }}
            >
           <Box
             sx={{
               flexGrow: 1,
               overflowY: 'auto', 
                backgroundColor: 'action.hover',
             }}
            >
              <Timeline >
              {
                postData?.comments.map((comment) => (
                  <TimelineItem key={comment?.id}>
                  <TimelineSeparator>
                    <TimelineDot color='success' variant='outlined' />
                    <TimelineConnector />
                  </TimelineSeparator>
          
                  <TimelineContent>
                    <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, color: 'text.primary' }}>
                        Design Review
                      </Typography>
                      <Typography variant='caption'>4th October</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src='/images/avatars/1.png' sx={{ width: '2rem', height: '2rem', mr: 2 }} />
                      <Typography variant='subtitle2' sx={{ fontWeight: 600 , m: 3 }}>
                        John Doe (Client)
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                       <Typography variant='body2' sx={{ mb: 2, color: 'text.primary' }}>
                              {comment?.body}
                       </Typography>
                           <Button onClick={() => handleAddComment(comment?.id, 'comment')}  size='small' variant='outlined' color='secondary' >
                                پاسخ دادن
                      </Button>
                      </Box>
                       
                       {
                         comment?.comments.map((comment) => (
                          <Box sx={{ marginLeft: 20 }} key={comment?.id}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                           <Avatar src='/images/avatars/1.png' sx={{ width: '1.5rem', height: '1.5rem', mr: 2 }} />
                            <Typography variant='body2' sx={{ fontWeight: 600 , m: 3 }}>
                              John Doe (Client)
                           </Typography>
                          </Box>
                           <Typography   variant='body2' sx={{ mb: 2, color: 'text.primary', marginLeft: 20 }}>
                              {comment?.body}  
                            </Typography>
                    
                         </Box>
                         ))
                       }
                        
                      {
                        showSendMsg === comment?.id && (
                          <form onSubmit={handleSubmit(onSubmit)}>
                          <ChatFormWrapper>
                          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                           <TextField
                             fullWidth
                             {...register('body', { required: true })}
                             size='small'
                             placeholder='comments...'
                             sx={{ '& .MuiOutlinedInput-input': { pl: 0 }, '& fieldset': { border: '0 !important' } }}
                            />
                          </Box>
                           <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <IconButton size='small' sx={{ mr: 1.5, color: 'text.primary' }}>
                         <Icon icon='mdi:microphone' fontSize='1.375rem' />
                        </IconButton>
                          <IconButton size='small' component='label' htmlFor='upload-img' sx={{ mr: 2.75, color: 'text.primary' }}>
                         <Icon icon='mdi:attachment' fontSize='1.375rem' />
                         <input hidden type='file' id='upload-img' />
                         </IconButton>
                        <Button onClick={() => handleAddComment(comment?.id, 'comment')}  type='submit'  variant='contained'>
                           ارسال
                        </Button>
                         </Box>
                      </ChatFormWrapper>
                        </ form>
                        )
                      }

                 
                  </TimelineContent>

                  
                </TimelineItem>

                
              ))
            }
      
           </Timeline>

             </Box>

           
           <form  onSubmit={handleSubmit(onSubmit)}>
              <ChatFormWrapper>
             <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
               <TextField
                 fullWidth
                 {...register('body', { required: true })}
                 size='small'
                 placeholder='comments...'
                 sx={{ '& .MuiOutlinedInput-input': { pl: 0 }, '& fieldset': { border: '0 !important' } }}
               />
             </Box>
             <Box sx={{ display: 'flex', alignItems: 'center' }}>
               <IconButton size='small' sx={{ mr: 1.5, color: 'text.primary' }}>
                 <Icon icon='mdi:microphone' fontSize='1.375rem' />
               </IconButton>
               <IconButton size='small' component='label' htmlFor='upload-img' sx={{ mr: 2.75, color: 'text.primary' }}>
                 <Icon icon='mdi:attachment' fontSize='1.375rem' />
                 <input hidden type='file' id='upload-img' />
               </IconButton>
               <Button onClick={() => handleAddComment(post?.id, 'post')} type='submit'  variant='contained'>
                  ارسال
               </Button>
             </Box>
               </ChatFormWrapper>
               </ form>
         
      
           </Box>     
            </Grid>
          </Grid>
        </Card>
        </Box>
        </>
      )
 
}

export default ShowPost;