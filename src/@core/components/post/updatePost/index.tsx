import { Button, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import MuiCard, { CardProps } from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Slide, { SlideProps } from '@mui/material/Slide'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { forwardRef, ReactElement, Ref, useState } from 'react'
import { useForm } from 'react-hook-form'
// ** Third Party Components
import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import SwiperControls from 'src/@core/components/post/swiper'
import { destoryPost } from 'src/lib/post/destoryPost'
import { getShowPost } from 'src/lib/post/showPost'
import { updateAddFile } from 'src/lib/post/updateAddFile'
import { updatePost } from 'src/lib/post/updatePost'
import { UpdateType } from 'src/types/post'
import FileUploaderMultiple from '../fileUploader'



const Transition = forwardRef(function Transition(
  props: SlideProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})


// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 750,  margin: '0 auto' }
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}

const UpdatePost = (props: UpdateType) => {
  const { post } = props
  console.log(post?.post, 'test1')
  const postId = post?.post?.id
  const router = useRouter()
  const tags = post?.tags?.tags;
  console.log(tags)
  const idPost = post?.post?.id;
  const formatTag = post?.post?.tags.map(tag => tag.id).join(',')
  console.log(formatTag)

  const [personName, setPersonName] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<number>(null)
  const [files, setFiles] = useState<File[]>([])

  const queryClient = useQueryClient();

  const { data: postData } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const data = await getShowPost(postId);
      return data;
    },
    initialData: post?.post  
  })

  console.log(postData, 'test2')


 
  const mutationUpdate = useMutation({
    mutationFn: updateAddFile,
    onSuccess: () => {
     queryClient.invalidateQueries({
       queryKey: ['post', postId],
     })
    },
    onError: (error) => {
     console.log('Error updating post', error)
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
    }
  }

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setPersonName(event.target.value as string[])
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()


  const onSubmit = async (data) => {
    try {
      const updateData = {
        title: data.title,
        tags: data.tags,
      }

      const update = await updatePost({ data: updateData , id: idPost })
      router.replace('/admin/post')
      toast.success('پست با موفقیت اپدیت شد .')
    } catch (error) {
      throw error 
    } 
  }

  const handlerSubmitAddFile = async () => {
    try {
      const addFileUpdata = {
        files: files,
      }
      const addFile = await updateAddFile({ data: addFileUpdata ,id: idPost })
      console.log(addFile, 'add file')
      mutationUpdate.mutate({ data: addFileUpdata ,id: idPost })
      setOpen(false)
      toast.success('فایل ها با موفقیت اضافه شد ')
    } catch (error) {
      console.log(error, 'Error in the add file ')
      throw error 
    }
        
  }
 

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(15.5, 7, 8)} !important` }}>
          <Box sx={{ mb: 6.5 }}>
            <Box>
              <Icon icon='mdi:plus-circle' color='primary' fontSize='large' onClick={() => handleClickOpen(idPost)} />
            </Box>

            <SwiperControls post={postData}/>

          </Box>
          <form  onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='off'>
            <TextField
            {...register('title', { required: true })}
              fullWidth
              defaultValue={post?.post?.title}
              type='text'
              label='Title'
              sx={{ display: 'flex', mb: 4 }}
            />

            <FormControl fullWidth>
              <InputLabel id='demo-multiple-checkbox-label'>Tag</InputLabel>
              <Select
              {...register('tags', { required: true })}
                multiple
                label='Tag'
                value={personName}
                MenuProps={MenuProps}
                onChange={handleChange}
                id='demo-multiple-checkbox'
                labelId='demo-multiple-checkbox-label'
                renderValue={selected => (selected as unknown as string[]).join(', ')}
              >
                {tags.map(tag => (
                  <MenuItem key={tag?.id} value={tag?.id}>
                    <Checkbox checked={personName.indexOf(tag?.id) > -1} />
                    <ListItemText primary={tag?.title} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

               <Box sx={{ m: 1 }}>
                 <Button type='submit' size='small' variant='contained' color='primary' sx={{ m: 1 }}>
                   تایید 
                 </Button>
               </Box>
              </form>
           </CardContent>
           <Dialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <DialogTitle id='customized-dialog-title' sx={{ p: 4 }}>
          <Typography variant='h6' component='span'>
            افزون فایل جدید
          </Typography>
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{ top: 10, right: 10, position: 'absolute', color: 'grey.500' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 4 }}>

          <FileUploaderMultiple files={files} setFiles={setFiles}/>
          
        </DialogContent>
        <DialogActions sx={{ p: theme => {theme.spacing(3)} }}>
          <Button onClick={handlerSubmitAddFile}>ارسال</Button>
        </DialogActions>
         </Dialog>
      </Card>
    </Box>
  )
}

export default UpdatePost
