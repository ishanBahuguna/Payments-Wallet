import React, { useRef } from 'react'
import { X } from 'lucide-react';

export default function PopupModal({message , onClose }) {
  const modalRef = useRef();

  const closeModal = (e) => {
    if(modalRef.current === e.target) {
      onClose();
    }
  }
  return (
    <div ref={modalRef} onClick={closeModal} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center pt-36 h-screen'>
        <div className='mt-10 flex flex-col gap-5 text-white'>
            <button onClick={onClose} className='place-self-end'><X size={50}/></button>
            <div className='bg-gray-800 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4'>
                <h1 className='text-3xl font-extrabold'>Can't Signup!!</h1>
                <p className='text-3xl font-bold max-w-md text-center'>{message}</p>
            </div>
        </div>
    </div>
  )
}
