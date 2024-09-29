"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const [skeletonCount, setSkeletonCount] = useState<number>(0);

  // calculate how many skeletons should be shown based on screen width
  const calculateSkeletonCount = () => {
    const cardHeight = 280;
    const screenHeight = window.innerHeight;
    // This determines how many cards should show based on screen height
    const rows = Math.ceil(screenHeight / cardHeight);
    // Set a reasonable amount of skeletons
    return rows * 2;
  };

  useEffect(() => {
    const updateSkeletonCount = () =>
      setSkeletonCount(calculateSkeletonCount());
    updateSkeletonCount();
    // Update count when window is resized
    window.addEventListener("resize", updateSkeletonCount);
    return () => {
      window.removeEventListener("resize", updateSkeletonCount);
    };
  }, []);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 h-screen">
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
          <Skeleton className="h-[180px] w-full rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[70%]" />
            <Skeleton className="h-4 w-[50%]" />
          </div>
        </div>
      ))}
    </section>
  );
}
