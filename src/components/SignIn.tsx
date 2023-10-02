"use client";

import { FC } from "react";
import { Input } from "./ui/input";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Icons } from "./Icons";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import Link from "next/link";

const SignIn = () => {
  const supabase = createClientComponentClient();

  const handleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/account/callback`,
      },
    });
  };

  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 ">
        <h3 className="text-sm font-semibold text-center">Luxville Store</h3>
        <h1 className="text-lg font-semibold tracking-tight pt-7">
          Hi, Welcome to back.
        </h1>
        <p className="py-5 font-normal">
          Enter your email address and we'll go from there.
        </p>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input type="email" />
        </div>

        <Button className="w-full">Sign In</Button>

        <div>
          <Button onClick={handleLogin} className="w-full">
            <Icons.google className="w-5 h-5 mr-2" />
            Google
          </Button>
        </div>

        <div className="flex flex-row items-center justify-center">
          <span className="text-sm">
            No account?
          </span>
          <Link href="/account/create">
            <Button variant="link"  className="font-semibold">
              Create one
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
