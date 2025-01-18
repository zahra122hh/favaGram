import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import MuiCard, { CardProps } from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import CardSnippet from 'src/@core/components/card-snippet'
import FileUploaderMultiple from 'src/@core/components/post/fileUploader'
import { postHandler } from 'src/lib/post/createPost'
import { TagType } from 'src/types/post'
import * as source from 'src/views/components/fileUploader/FileUploaderSourceCode'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 600 , margin: '0 auto' }
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

const FormCreatePost = (props: TagType) => {
  const { tags } = props
  console.log(tags, 'tags create ')
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const [files, setFiles] = useState<File[]>([])
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([])
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedTagIds(event.target.value as string[])
  }

  const onSubmit = async data => {
    const dataPost: any = {
      files: files,
      title: data.title,
      tags: data.tags
    }
    console.log(dataPost)

    const posts = await postHandler({ data: dataPost })
    toast.success('پست با موفقیت ایجاد شد.')
    router.replace('/admin/post')

  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(15.5, 7, 8)} !important` }}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='off'>
            <Box sx={{ mb: 6.5 }}>
              <CardSnippet
                title='Upload Multiple Files'
                code={{
                  tsx: source.FileUploaderMultipleTSXCode,
                  jsx: source.FileUploaderMultipleJSXCode
                }}
              >
                <FileUploaderMultiple files={files} setFiles={setFiles} />
              </CardSnippet>
            </Box>
            <TextField
              {...register('title', { required: true })}
              fullWidth
              type='text'
              label='عنوان'
              sx={{ display: 'flex', mb: 4 }}
            />
            {/* {errors.username?.type === 'required' && <p role='alert'>این فیلد اجباری است, </p>} */}

            <FormControl fullWidth>
              <InputLabel id='demo-multiple-checkbox-label'>تگ</InputLabel>
              <Select
                {...register('tags', { required: true })}
                multiple
                label='Tag'
                value={selectedTagIds}
                MenuProps={MenuProps}
                onChange={handleChange}
                id='demo-multiple-checkbox'
                labelId='demo-multiple-checkbox-label'
                renderValue={selected => (selected as unknown as string[]).join(', ')}
              >
                 {tags?.tags?.map(tag => (
                   <MenuItem key={tag?.id} value={tag?.id}> 
                     <Checkbox checked={selectedTagIds.indexOf(tag?.id) > -1} />
                     <ListItemText primary={tag?.title} /> 
                   </MenuItem> 
                ))} 

              </Select>
              {errors.tags && <span className='error'>این فیلد اجباری است </span>}
            </FormControl>

            <Box sx={{ m: 1 }}>
              <Button type='submit' size='small' variant='contained' color='primary' sx={{ m: 1 }}>
                تایید
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

export default FormCreatePost
