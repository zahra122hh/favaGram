// ** React Imports
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide, { SlideProps } from '@mui/material/Slide'
import clsx from 'clsx'
import { useKeenSlider } from 'keen-slider/react'
import { useRouter } from 'next/router'
import { forwardRef, ReactElement, Ref, useState } from 'react'
import toast from 'react-hot-toast'
import CardSnippet from 'src/@core/components/card-snippet'
import Icon from 'src/@core/components/icon'
import { useSettings } from 'src/@core/hooks/useSettings'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import { updateDeleteFile } from 'src/lib/post/updateDeleteFile'
import * as source from 'src/views/components/swiper/SwiperSourceCode'




const Transition = forwardRef(function Transition(
  props: SlideProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})


const SwiperControls2 = (files: any) => {
 
  console.log(files, 'files')


  const router = useRouter()

   const {
      settings: { direction }
     } = useSettings()

  const [loaded, setLoaded] = useState<boolean>(false)
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [open, setOpen] = useState(false) 
  const [selectedUserId, setSelectedUserId] = useState<number>(null)


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
    const deleteFile =  await updateDeleteFile(selectedUserId)
      mutationPost.mutate(selectedUserId)
      setOpen(false)
      toast.success('عکس با موفقیت حذف شد .')
      
    }
  }

  // ** Hook
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    rtl: direction === 'rtl',
    slideChanged(slider) {
      setCurrentSlide(slider?.track.details.rel)
    },
    created() {
      setLoaded(true)
    }
  })

  return (
    <>
      <CardContent className='content-center'>
        <KeenSliderWrapper>
          <CardSnippet
            title='Post'
            code={{
              tsx: source.SwiperControlsTSXCode,
              jsx: source.SwiperControlsJSXCode
            }}
          >
            <Box className='navigation-wrapper'>
              <Box ref={sliderRef} className='keen-slider'>
                
                  {
                      files?.files?.map((file) => (
                        <Box key={file?.id} className='keen-slider__slide'>
                        <img  src={file?.address}   alt='swiper 1' style={{ width: 400, height: 200 }} />
                        
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            display: 'flex',
                            gap: 1
                          }}
                        >
                          <Icon icon='mdi:delete' onClick={() => handleClickOpen(file?.id)} />
                        </Box>
      
                        <Dialog
                          open={open}
                          keepMounted
                          onClose={handleClose}
                          TransitionComponent={Transition}
                          aria-labelledby='alert-dialog-slide-title'
                          aria-describedby='alert-dialog-slide-description'
                           >
                         <DialogTitle id='alert-dialog-slide-title'>حذف عکس</DialogTitle>
                          <DialogContent>
                           <DialogContentText id='alert-dialog-slide-description'>
                             اایا از حذف این عکس اطمینان دارید؟؟
                          </DialogContentText>
                         </DialogContent>
                        <DialogActions className='dialog-actions-dense'>
                            <Button onClick={handleClose}>لغو</Button>
                            <Button onClick={handleConfirmDelete}>تایید</Button>
                           </DialogActions>
                        </Dialog>
      
                       </Box>
                       
                      ))
                  }
                    
                  
              </Box>
              {loaded && instanceRef.current && (
          <>
            <Icon
              icon='mdi:chevron-left'
              className={clsx('arrow arrow-left', {
                'arrow-disabled': currentSlide === 0
              })}
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
            />
            <Icon
              icon='mdi:chevron-right'
              className={clsx('arrow arrow-right', {
                'arrow-disabled': currentSlide === instanceRef?.current.track.details?.slides.length - 1
              })}
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
            />
          </>
        )}
            </Box>

    {loaded && instanceRef.current && (
        <Box className='swiper-dots'>
          {[...Array(instanceRef?.current.track.details?.slides.length).keys()].map(idx => {
            return (
              <Badge
                key={idx}
                variant='dot'
                component='div'
                className={clsx({
                  active: currentSlide === idx
                })}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx) 
                }}
              ></Badge>
            )
          })}
        </Box>
      )}
      
          </CardSnippet>
        </KeenSliderWrapper>
      </CardContent>
    </>
  )
}

export default SwiperControls2
