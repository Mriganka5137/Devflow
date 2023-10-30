import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import QuestionCard from "../cards/QuestionCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string;
}

const QuestionTab = async ({ searchProps, userId, clerkId }: Props) => {
  const result = await getUserQuestions({ userId, page: 1 });
  return (
    <>
      {result?.questions.map((question) => (
        <QuestionCard
          _id={question._id}
          key={question._id}
          clerkId={clerkId}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes}
          answers={question.answers}
          views={question.views}
          createdAt={question.createdAt}
        />
      ))}
    </>
  );
};

export default QuestionTab;
