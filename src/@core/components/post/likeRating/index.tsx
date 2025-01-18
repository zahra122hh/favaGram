// ** MUI Imports
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const RatingsLike = () => {
  return (
    <div>
      <Box sx={{ mb: 5 }}>
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
    </div>
  )
}

export default RatingsLike
