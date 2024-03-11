"use client";
import useScrollTop from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import React from "react";
import Logo from "./logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/modeToggle";

type Props = {};

const Navbar = (props: Props) => {
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
      <div
        className="md:ml-auto md:justify-end justify-between
      w-full flex gap-x-2"
      >
        <ModeToggle></ModeToggle>
      </div>
    </div>
  );
};

export default Navbar;
