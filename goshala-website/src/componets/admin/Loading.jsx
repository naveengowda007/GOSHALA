import React from 'react'
import images from '../../constants/images'

const Loading = () => {
  return (
    <div className='w-full flex justify-center items-center rounded-2xl'>
      <img src={images.LoadingGif} alt=""  className='w-1/4 rounded-2xl '/>
    </div>
  )
}

export default Loading
