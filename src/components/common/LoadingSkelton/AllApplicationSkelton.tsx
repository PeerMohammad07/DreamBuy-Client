import { LinearProgress } from '@mui/material'
import { Box } from '@mui/system'

const AllApplicationSkelton = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='text-center'>
        <img src="/dreambuylogo.png" className='h-16 w-64 mx-auto' alt="DreamBuy Logo" />
        <Box sx={{ width: '100%', margin: '20px auto' }}>
          <LinearProgress />
        </Box>
      </div>
    </div>
  )
}

export default AllApplicationSkelton
