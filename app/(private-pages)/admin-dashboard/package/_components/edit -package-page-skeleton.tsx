'use client'
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";


export default function EditPackagePageSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl mx-auto py-12 px-6"
    >
      {/* Dialog Skeleton */}
      {/* <Skeleton className="h-12 w-3/4 mx-auto mb-8" /> */}

      {/* Title Skeleton */}
      <Skeleton className="h-8 w-1/2 mx-auto mb-4" />

      {/* Subtitle Skeleton */}
      <Skeleton className="h-6 w-3/4 mx-auto mb-12" />

      {/* Stepper Skeleton */}
      <div className="mb-12 space-y-4">
        <div className="flex justify-between items-center">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <Skeleton className="w-10 h-10 rounded-full" />
              {step < 3 && <Skeleton className="w-32 h-1.5 mx-2" />}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      {/* Form Skeleton */}
      <div className="space-y-8">
        <Skeleton className="h-12 w-full mb-6" />
        <Skeleton className="h-12 w-full mb-6" />
        <Skeleton className="h-12 w-full mb-6" />
      </div>

      {/* Button Skeletons */}
      <div className="flex justify-between pt-6">
        <Skeleton className="h-12 w-32" />
        <Skeleton className="h-12 w-32 ml-auto" />
      </div>
    </motion.div>
  );
}
