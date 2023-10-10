import React from "react";
import RenderTag from "../shared/RenderTag";
import Link from "next/link";
const popularTags = [
  {
    _id: 1,
    name: "React",
    totalQuestions: 15,
  },
  {
    _id: 2,
    name: "JavaScript",
    totalQuestions: 5,
  },
  {
    _id: 3,
    name: "Next.JS",
    totalQuestions: 10,
  },
  {
    _id: 4,
    name: "Node.Js",
    totalQuestions: 13,
  },
  {
    _id: 5,
    name: "Tailwind",
    totalQuestions: 7,
  },
];

const QuestionCard = () => {
  return (
    <div className="card-wrapper light-border w-full rounded-lg border px-11 py-9">
      <Link href="/" className="cursor-pointer">
        <h3 className="h3-semibold text-dark200_light900">
          The Lightning Component c:LWC_PizzaTracker generated invalid output
          for field status. Error How to solve this
        </h3>
      </Link>

      {/* Rendering Tags */}
      <div className="mt-2 flex  gap-4">
        {popularTags.map((tag) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            totalQuestions={tag.totalQuestions}
            showCount={false}
          />
        ))}
      </div>
      {/*  */}
    </div>
  );
};

export default QuestionCard;
