import React, { useEffect } from 'react'

export default function Modal({open,setOpen,children}:any) {
    const escFunction = (event:any) => {
        if(event.keyCode === 27) {
            setOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false)
        return () => {
            document.removeEventListener("keydown", escFunction, false)
        }
    }, [])
  return (
    <div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-2xl bg-black bg-opacity-50">
          <div className="relative bg-white sm:max-w-7xl w-full h-screen  overflow-y-auto shadow-2xl p-8">
            <div
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-4xl font-bold cursor-pointer"
              onClick={() => setOpen(false)}
            >
              &times;
            </div>
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
