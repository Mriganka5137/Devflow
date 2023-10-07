import { questions } from "@/constants";
import Link from "next/link";
import React from "react";

const RightSidebar = () => {
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[266px] flex-col flex-wrap justify-between overflow-y-auto border p-6 shadow-light-300  dark:shadow-none max-xl:hidden">
      <div className="flex flex-1 flex-col gap-6">
        {questions.map((question) => {
          return (
            <Link href="/" key={question}>
              {question}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default RightSidebar;
