import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import Rating from '@mui/material/Rating'
import Slide, { SlideProps } from '@mui/material/Slide'
import { styled } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { forwardRef, ReactElement, Ref, useState } from 'react'
import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import { destoryPost } from 'src/lib/post/destoryPost'
import { getAllPost } from 'src/lib/post/indexPost'
import { likePost } from 'src/lib/post/like'
import { ListPostsProps } from 'src/types/post'
import SwiperControls2 from '../swiper3'


const Transition = forwardRef(function Transition(
  props: SlideProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const CustomBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-dot': {
    width: '40px', // تغییر عرض دایره
    height: '40px', // تغییر ارتفاع دایره
    fontSize: '14px', // تغییر اندازه فونت
  },
  '& .MuiBadge-standard': {
    height: 'auto', // تنظیم ارتفاع خودکار برای تطابق با اندازه جدید
  },
}));

const CardPost = (props: ListPostsProps) => {
  const { posts } = props;
  console.log(posts, 'testtttt3333')
  const { data: session}: any = useSession();

  const router = useRouter()
  const [selectedUserId, setSelectedUserId] = useState<number>(null)
  const [open, setOpen] = useState<boolean>(false)


 const { data: postsData } = useQuery({
   queryKey: ['posts', posts],
   queryFn: async () => {
     const posts = await getAllPost();

     return posts;
   }
 })
11
 console.log(postsData, 'POSTS')


 const queryClient = useQueryClient();
 
 const mutation = useMutation({
   mutationFn: async (postId) => {
     const like = await likePost(postId)
   },
   onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['posts', posts],
    })
  },
  onError: (error) => {
    console.log('Error like post', error)
  },
 })
  



   const handleClickOpen = (id: number) => { 
       setSelectedUserId(id)
       setOpen(true)
   }

  const handleClose = () => { 
  setOpen(false)
  setSelectedUserId(null)
}

  const handleConfirmDelete = async () => {
    if (selectedUserId !== null) {
      await destoryPost(selectedUserId)
      handleClose()
      router.replace('/admin/post')
     toast.success('پست با موفقیت حذف شد .')
    }
  }

  const handleLike = async (id: number) => {
      const postId = id
      mutation.mutate(postId)
  }
  console.log(session, 'session test')

  console.log(session?.user?.fullname, 'testtt')

 
  return (
    <Box>
      <Grid container spacing={6}>
        {postsData?.map(post => (
          <Grid key={post?.id} item xs={12} md={6} lg={4}>
            <Card>
              <Box>
                <Box
                  className='demo-space-x'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 2
                  }}
                >
                  <Avatar src='/images/avatars/1.png' alt='Victor Anderson' />
                  <Typography sx={{ marginLeft: 2 }}>{post?.user?.fullname ?? 'name'}</Typography>
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

               
                <SwiperControls2 files={post?.files} />

                <Box
                  className='demo-space-x'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 2
                  }}
                >
                {
                  post?.tags.map((tag) => (
                    <CustomBadge key={tag?.id}  sx={{padding: 4}} badgeContent={tag?.title} color='primary' />
                  ))
                }
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={9}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>

                    <Tooltip title="save" arrow>
                      <Box sx={{ m: 2,'&:hover': {cursor: 'pointer'} }}>
                        <Icon icon='mdi:content-save' fontSize={25}/>
                      </Box> 
                     </Tooltip>
                      
                     <Tooltip title="share" arrow>
                       <Box sx={{ m: 2,'&:hover': {cursor: 'pointer'} }}>
                         <Icon icon='mdi:share-variant' fontSize={25}/>
                       </Box>
                       </Tooltip>
                      
                      <Tooltip title="comment" arrow>  
                        <Box sx={{ m: 2,'&:hover': {cursor: 'pointer'} }}>
                           <Icon icon='mdi:comment' fontSize={25} onClick={() => router.push(`/admin/post/${post?.id}/show`)} />
                        </Box>
                      </Tooltip>
                     
                        <Tooltip title="show" arrow>
                         <Box sx={{ m: 2,'&:hover': {cursor: 'pointer'} }}>
                           <Icon icon='mdi:eye' fontSize={25} onClick={() => router.push(`/admin/post/${post?.id}/show`)} />
                           </Box>
                        </Tooltip>
                      
                        <Tooltip title="update" arrow>
                           <Box sx={{ m: 2,'&:hover': {cursor: 'pointer'} }}>
                              <Icon icon='mdi:pencil' fontSize={25} onClick={() => router.push(`/admin/post/${post?.id}/update`)} />
                          </Box>
                        </Tooltip>
                     
                      <Tooltip title="delete" arrow>
                       <Box sx={{ m: 2,'&:hover': {cursor: 'pointer'} }}>
                          <Icon icon='mdi:delete' fontSize={25} onClick={() => handleClickOpen(post?.id)} />
                        </Box>
                      </Tooltip>
                     
               
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby='alert-dialog-title'
                        aria-describedby='alert-dialog-description'
                       >
                      <DialogTitle id='alert-dialog-title'>حذف پست </DialogTitle>
                       <DialogContent>
                       <DialogContentText id='alert-dialog-description'>
                                ایا از حذف این پست اطمینان دارید ؟
                        </DialogContentText>
                       </DialogContent>
                     <DialogActions className='dialog-actions-dense'>
                           <Button onClick={handleClose}>لغو </Button>
                            <Button onClick={handleConfirmDelete}>تایید</Button>
                      </DialogActions>
                      </Dialog>


                       </Box>
                     </Grid>
                  <Grid item xs={3}>
                    <Box sx={{ display: 'flex' }} onClick={() => handleLike(post?.id)}>
                      <Box sx={{ m: 2 }} >
                         <Rating
                             precision={1}
                             max={1}
                             size='large'
                             defaultValue={0}
                             name='customized-color'
                             sx={{ color: 'error.main' }}
                             icon={<Icon icon='mdi:heart' />}
                             emptyIcon={<Icon icon='mdi:heart' />}
                               />
                        </Box>
                      <Box sx={{ m: 2 }}>
                        <Typography>{postsData?.likes_count}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}



export default CardPost


