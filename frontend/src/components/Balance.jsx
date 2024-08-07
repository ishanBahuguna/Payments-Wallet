import React from 'react'

export default function ({value}) {
  return (
    <div className='flex p-5 gap-3 ml-5'>
        <div className='font-bold'>
            Your Balance :
        </div>
        <div className='font-medium'>
            Rs {value}
        </div>
    </div>
  )
}
