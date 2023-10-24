"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const Votes = () => {
  return (
    <div className="flex items-center justify-center gap-5">
      <Button onClick={() => {}}>
        <Image
          src="/assets/icons/upvote.svg"
          width={18}
          height={18}
          alt="upvote"
        />
      </Button>
      <Button onClick={() => {}}>
        <Image
          src="/assets/icons/downvote.svg"
          width={18}
          height={18}
          alt="upvote"
        />
      </Button>
    </div>
  );
};

export default Votes;
