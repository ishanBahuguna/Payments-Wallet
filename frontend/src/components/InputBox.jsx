import React from 'react'

export default function InputBox({placeholder , label , onChange}) {
  return (
    <div className='m-3'>
        <div className='font-medium text-sm text-left py-2'>
            {label}
        </div>
        <input className={'w-full px-2 py-2 border-2 border-slate-300 rounded'} onChange={onChange} type="text" placeholder={placeholder} />
    </div>
  )
}
