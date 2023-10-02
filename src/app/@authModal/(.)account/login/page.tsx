"use client";

import SignIn from "@/components/SignIn";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const router = useRouter();

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      router.back();
    }
  };

  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-10" onClick={closeModal}>
      <div className="container flex items-center h-full max-w-lg mx-auto">
        <div className="relative bg-white w-full h-fit py-10 px-2 rounded-2xl">
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default Page;
