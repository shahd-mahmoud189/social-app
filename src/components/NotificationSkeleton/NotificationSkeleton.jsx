import React from 'react'

export default function NotificationSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div 
          key={i} 
          className="flex items-start gap-5 p-5 rounded-4xl border-2 border-white bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] animate-pulse"
        >
          {/* Profile Image Skeleton */}
          <div className="w-14 h-14 bg-slate-200 rounded-2xl shrink-0" />

          {/* Text Content Skeleton */}
          <div className="flex-1 space-y-3">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                {/* Name */}
                <div className="h-4 w-32 bg-slate-200 rounded-lg" />
                {/* Notification Type */}
                <div className="h-3 w-20 bg-slate-100 rounded-lg" />
              </div>

              <div className="flex flex-col items-end gap-2">
                {/* Date */}
                <div className="h-3 w-16 bg-slate-100 rounded-lg" />
                {/* Button */}
                <div className="h-6 w-14 bg-slate-200 rounded-full" />
              </div>
            </div>

            {/* Entity Body Skeleton */}
            <div className="h-16 w-full bg-slate-50 rounded-2xl border border-slate-100" />
          </div>
        </div>
      ))}
    </div>
  )
}
