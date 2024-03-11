import React from "react";
import Image from "next/image";
type Props = {};

const Heros = (props: Props) => {
  return (
    <div className="flex flex-row items-center  max-w-5xl justify-center">
      <div
        className="relative
      w-[300px]
      h-[300px]
      sm:w-[350px]
      sm:h-[350px]
      md:w-[400px]
      md:h-[400px]"
      >
        <Image
          src="/documents.png"
          alt="Documents"
          fill
          className="object-contain dark:hidden"
        ></Image>
        <Image
          src="/documents-dark.png"
          alt="Documents"
          fill
          className="object-contain hidden dark:block"
        ></Image>
      </div>

      <div className="relative h-[400px] w-[400px] hidden md:block">
        <Image
          src="/reading.png"
          alt="Reading"
          fill
          className="object-contain 
          dark:hidden"
        ></Image>
        <Image
          src="/reading-dark.png"
          alt="Reading"
          fill
          className="object-contain hidden dark:block"
        ></Image>
      </div>
    </div>
  );
};

export default Heros;
