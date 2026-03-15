import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function CommentSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div>
          <Skeleton circle height={40} width={40} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Skeleton width={120} height={16} />
            <Skeleton width={80} height={12} className="ml-2" />
          </div>
          <div className="mt-2">
            <Skeleton count={2} />
          </div>
        </div>
      </div>
    </div>
  )
}
