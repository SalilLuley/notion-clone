"use client";
import React from "react";
import Logo from "./logo";
import { Button } from "@/components/ui/button";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div
      className="flex 
      items-center 
      w-full 
      p-6 
      z-50
      pb-2
      dark:bg-[#1F1F1F]"
    >
      <Logo />
      <div
        className="md:ml-auto 
        w-full justify-between 
        md:justify-end 
        flex items-center 
        gap-x-2
        text-muted-foreground
        "
      >
        <Button variant={"ghost"} size={"sm"}>
          Privacy Policy
        </Button>
        <Button variant={"ghost"} size={"sm"}>
          Terms and Conditions
        </Button>
      </div>
    </div>
  );
};

export default Footer;
