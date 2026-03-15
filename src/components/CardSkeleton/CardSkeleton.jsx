import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Card } from "flowbite-react";

export default function CardSkeleton() {
  return (
    <Card className="mx-auto my-5">
      {/* Header with User Info */}
      <div className="flex items-center gap-3 mb-4">
        <Skeleton circle width={40} height={40} />
        <div className="flex-1">
          <Skeleton width="40%" height={15} />
          <Skeleton width="25%" height={10} />
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <Skeleton count={3} />
      </div>

      {/* Post Image Placeholder */}
      <div className="mb-4">
        <Skeleton height={200} borderRadius={8} />
      </div>

      {/* Post Stats */}
      <div className="flex justify-between border-t border-b border-gray-200 py-3 mb-4">
        <Skeleton width={60} />
        <Skeleton width={60} />
        <Skeleton width={60} />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <div className="flex-1"><Skeleton height={40} borderRadius={50} /></div>
        <div className="flex-1"><Skeleton height={40} borderRadius={50} /></div>
        <div className="flex-1"><Skeleton height={40} borderRadius={50} /></div>
      </div>
    </Card>
  );
}