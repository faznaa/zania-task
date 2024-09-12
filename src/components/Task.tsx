import React from 'react'

export default function SingleTask({ data, handleDone, handleDelete } :any) {
  return (
    <div className='w-full sm:max-w-md p-4 bg-gray-800 my-4'>
        <div className='flex justify-between items-start'>
            <div>
                <div className={`text-xl font-semibold ${data.status == 'done' ? 'text-green-400' : ''}`}>{data.title}</div>
                <div className='text-base font-semibold'>{data.description}</div>

            </div>
            <div className='flex gap-x-4'>
                <button className='px-2 bg-gray-700' onClick={() => handleDone(data.id)}>Done</button>
                <button className='px-2 bg-gray-700' onClick={() => handleDelete(data.id)}>Delete</button>

            </div>
        </div>
    </div>
  )
}
