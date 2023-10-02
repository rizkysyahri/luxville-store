"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function SheetForAccount() {
  const supabase = createClientComponentClient();

  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      await supabase.auth.signOut();
      console.log("Logged out successfully.");
      router.refresh();

      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Sheet>
      {isLoggedIn ? (
        <>
          <SheetTrigger asChild>
            <Button variant="link" className="text-xs">
              Account
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="flex items-center justify-center">
              <SheetTitle className="font-light text-base">Account</SheetTitle>
            </SheetHeader>
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
            </div>
            <div>
              <SheetDescription>
                Your account is not verified yet. A verification email has been
                sent to caiuhuy@gmail.com.
                <div className="space-y-3 flex items-center justify-center">
                  <Button variant="link" className="text-sky-500 font-light">
                    Resend Verfication Error
                  </Button>
                </div>
              </SheetDescription>
            </div>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
            </div>

            <div className="flex items-center justify-center py-4">
              <div className="grid items-center">
                <span className="text-2xl">Hi, Cay</span>

                <Button
                  variant="link"
                  className="text-xs font-light"
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>
              </div>
            </div>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
            </div>

            <SheetHeader className="flex items-center justify-center py-4">
              <SheetTitle className="font-light text-base">Address</SheetTitle>
              <SheetDescription className="text-xs">
                No Saves Addresses{" "}
              </SheetDescription>
            </SheetHeader>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
            </div>

            <SheetHeader className="flex items-center justify-center py-4">
              <SheetTitle className="font-light text-base">Profile</SheetTitle>
              <SheetDescription className="text-xs">
                No Saves Addresses{" "}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </>
      ) : (
        <Button variant="link">
          <Link href="/account/login" scroll={false}>Login</Link>
        </Button>
      )}
    </Sheet>
  );
}
