import React from 'react'
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
export default function NotFound() {
  return (
    <div className='flex justify-center py-12 '>
      <Alert color="failure" icon={HiInformationCircle}>
      <span className="font-medium">Page not found</span>
    </Alert>
    </div>
  )
}
