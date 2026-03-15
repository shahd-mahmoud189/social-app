import React from 'react'

export default function Empty() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <i className="fa-solid fa-note-sticky text-3xl text-blue-400"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No activity to show yet</h3>
          <p className="text-gray-500 max-w-xs mx-auto mb-6">
            It looks like there's no content here at the moment. Check back later for updates.
          </p>
          
        </div>
  )
}
