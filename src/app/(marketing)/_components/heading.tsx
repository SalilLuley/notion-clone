"use client";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const Heading = (props: Props) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4 flex flex-col items-center">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your ideas documents and plans unified. Welcome to{" "}
        <span className="underline">Notes</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Notes is a connected workspace where better ideas are born
      </h3>
      {isLoading && <Spinner size={"lg"} />}
      {!isAuthenticated && !isLoading && (
        <>
          <SignInButton mode="modal">
            <Button>
              Get Notes for Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </SignInButton>
        </>
      )}{" "}
      {isAuthenticated && !isLoading && (
        <>
          <Button asChild>
            <Link href="/documents">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default Heading;
