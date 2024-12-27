import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export const SummarySkeleton = () => {
  return (
    <>
      <Card className="border-gray-200 shadow-lg rounded-xl">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-32" />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-32" />
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <Skeleton className="h-4 w-32 mb-4" />
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white p-2 rounded-lg">
                  <Skeleton className="h-6 w-12 mx-auto mb-2" />
                  <Skeleton className="h-4 w-16 mx-auto" />
                </div>
                <div className="bg-white p-2 rounded-lg">
                  <Skeleton className="h-6 w-12 mx-auto mb-2" />
                  <Skeleton className="h-4 w-16 mx-auto" />
                </div>
                <div className="bg-white p-2 rounded-lg">
                  <Skeleton className="h-6 w-12 mx-auto mb-2" />
                  <Skeleton className="h-4 w-16 mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-gray-200 shadow-lg rounded-xl">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-32" />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-32" />
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <Skeleton className="h-4 w-32 mb-4" />
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white p-2 rounded-lg">
                  <Skeleton className="h-6 w-12 mx-auto mb-2" />
                  <Skeleton className="h-4 w-16 mx-auto" />
                </div>
                <div className="bg-white p-2 rounded-lg">
                  <Skeleton className="h-6 w-12 mx-auto mb-2" />
                  <Skeleton className="h-4 w-16 mx-auto" />
                </div>
                <div className="bg-white p-2 rounded-lg">
                  <Skeleton className="h-6 w-12 mx-auto mb-2" />
                  <Skeleton className="h-4 w-16 mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-gray-200 shadow-lg rounded-xl">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-32" />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-32" />
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <Skeleton className="h-4 w-32 mb-4" />
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white p-2 rounded-lg">
                  <Skeleton className="h-6 w-12 mx-auto mb-2" />
                  <Skeleton className="h-4 w-16 mx-auto" />
                </div>
                <div className="bg-white p-2 rounded-lg">
                  <Skeleton className="h-6 w-12 mx-auto mb-2" />
                  <Skeleton className="h-4 w-16 mx-auto" />
                </div>
                <div className="bg-white p-2 rounded-lg">
                  <Skeleton className="h-6 w-12 mx-auto mb-2" />
                  <Skeleton className="h-4 w-16 mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
