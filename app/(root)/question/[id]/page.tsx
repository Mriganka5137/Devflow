import React from "react";
import { getQuestionByID } from "@/lib/actions/question.action";
import Link from "next/link";
import Image from "next/image";
import Metric from "@/components/shared/Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import ParseHTML from "@/components/shared/ParseHTML";

const Page = async ({ params, searchParams }) => {
  const result = await getQuestionByID({ questionId: params.id });
  return (
    <>
      <div className="flex-start w-full flex-col ">
        <div className="flex w-full flex-col-reverse justify-between gap-5  sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${result.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={result.author.picture}
              className="rounded-full"
              width={22}
              height={22}
              alt="profile"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {result.author.name}
            </p>
          </Link>
          <div className="flex justify-end"> VOTE</div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {result.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimestamp(result.createdAt)}`}
          title=""
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="answers"
          value={formatAndDivideNumber(result.answers.length)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(result.views)}
          // value={views}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
      <ParseHTML />
    </>
  );
};

export default Page;
