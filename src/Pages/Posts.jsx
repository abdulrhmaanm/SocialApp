
import React from 'react'
import { Postcard } from '../Posts/Postcard'
import Postslists from '../Posts/Postslists'
import AddPost from './../Posts/AddPost';

export default function Posts() {
  return (

    <div className='flex items-center justify-center py-5'>
      <div className='mx-auto max-w-4xl'>
        <AddPost/>
        <Postslists/>
      </div>
    </div>
  )
}
