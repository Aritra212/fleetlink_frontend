"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Error() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center h-dvh text-center">
      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-extrabold text-[10rem]  leading-none">
        400
      </span>
      <h2 className="my-2 font-bold font-heading text-2xl">
        Something&apos;s wrong
      </h2>

      <div className="flex justify-center gap-2 mt-8">
        <Button onClick={() => router.back()} variant="default" size="lg">
          Go back
        </Button>
        <Button onClick={() => router.push("/")} variant="outline" size="lg">
          Back to Home
        </Button>
      </div>
    </div>
  );
}
