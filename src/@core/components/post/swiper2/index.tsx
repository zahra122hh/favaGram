// ** MUI Imports
import Box from '@mui/material/Box'
import { useKeenSlider } from 'keen-slider/react'
import CardSnippet from 'src/@core/components/card-snippet'
// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import { FilesList } from 'src/types/post'
// ** Source code imports
import * as source from 'src/views/components/swiper/SwiperSourceCode'


const SwiperAutoSwitch = (filesData : FilesList) => {

  const files = filesData?.files;

  const {
    settings: { direction }
  } = useSettings()

  // ** Hook
  const [ref] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      rtl: direction === 'rtl'
    },
    [
      slider => {
        let mouseOver = false
        let timeout: number | ReturnType<typeof setTimeout>
        const clearNextTimeout = () => {
          clearTimeout(timeout as number)
        }
        const nextTimeout = () => {
          clearTimeout(timeout as number)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider?.next()
          }, 2000)
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on('dragStarted', clearNextTimeout)
        slider.on('animationEnded', nextTimeout)
        slider.on('updated', nextTimeout)
      }
    ]
  )

  

  return (
    <KeenSliderWrapper sx={{ m:1 }}>
          <CardSnippet
            title='Post'
            code={{
              tsx: source.SwiperControlsTSXCode,
              jsx: source.SwiperControlsJSXCode
            }}
          >
              <Box ref={ref} className='keen-slider'>
                {
                  files?.map((file) => (
                <Box key={file?.id} className='keen-slider__slide'>
                    <img src={file?.address} alt='swiper 1' style={{ width: 700 , height: 300}}/>
               </Box>
                  ))
                }
             </Box>
          </CardSnippet>
        </KeenSliderWrapper>
   
  )
}

export default SwiperAutoSwitch
