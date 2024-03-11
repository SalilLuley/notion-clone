"use client";
import useScrollTop from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import React from "react";
import Logo from "./logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/modeToggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
type Props = {};

const Navbar = (props: Props) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();
  console.log(scrolled);
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo></Logo>
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center flex-row gap-x-2">
        {isLoading && (
          <p>
            <Spinner />
          </p>
        )}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant={"ghost"} size={"sm"}>
                Log In
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size={"sm"}>Get Notes Free</Button>
            </SignInButton>
          </>
        )}{" "}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant={"ghost"} size={"sm"}>
              <Link href={"./documents"}>Enter Notes</Link>
            </Button>
            <UserButton afterSignOutUrl="/"></UserButton>
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
