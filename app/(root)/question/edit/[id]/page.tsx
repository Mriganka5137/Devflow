import Question from "@/components/forms/Question";
import { getQuestionByID } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import React from "react";

const page = async ({ params }: ParamsProps) => {
  const { userId } = auth();

  if (!userId) return null;

  const mongoUser = await getUserById({ userId });
  const result = await getQuestionByID({ questionId: params.id });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>
      <div className=" mt-9">
        <Question
          mongoUserId={mongoUser}
          type="Edit"
          questionDetails={JSON.stringify(result)}
        />
      </div>
    </>
  );
};

export default page;
