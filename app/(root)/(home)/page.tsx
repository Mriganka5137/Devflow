import HomeFilters from "@/components/home/HomeFilters";
import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResults from "@/components/shared/NoResults";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title: "Best Practices for data fetching in a Next.js app",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "Next.js" },
    ],
    author: {
      _id: "a1",
      name: "Sujata",
      picture: "url/to/picture1.jpg",
    },
    votes: 10,
    answers: [
      {
        /* answer object */
      },
      {
        /* answer object */
      },
    ], // Assuming object structure for answers
    views: 100,
    createdAt: new Date("1998-08-01T18:30:00.000Z"),
  },
  {
    _id: "2",
    title: "Redux toolkit Not Updating State as Expected",
    tags: [{ _id: "1", name: "React" }],
    author: {
      _id: "a2",
      name: "Mriganka",
      picture: "url/to/picture2.jpg",
    },
    votes: 25,
    answers: [
      {
        /* answer object */
      },
      {
        /* answer object */
      },
    ], // Assuming object structure for answers
    views: 1000,
    createdAt: new Date("2021-08-01T18:30:00.000Z"),
  },
  {
    _id: "3",
    title: "How do I use express as a custom server in NextJS",
    tags: [{ _id: "1", name: "Next.js" }],
    author: {
      _id: "a3",
      name: "Adrian",
      picture: "url/to/picture3.jpg",
    },
    votes: 1,
    answers: [
      {
        /* answer object */
      },
      {
        /* answer object */
      },
    ], // Assuming object structure for answers
    views: 10,
    createdAt: new Date("2023-08-01T18:30:00.000Z"),
  },
  {
    _id: "4",
    title: "cascading Deletes in SQLAlchemy",
    tags: [{ _id: "1", name: "Python" }],
    author: {
      _id: "a4",
      name: "Sujata",
      picture: "url/to/picture4.jpg",
    },
    votes: 100000,
    answers: [
      {
        /* answer object */
      },
      {
        /* answer object */
      },
    ], // Assuming object structure for answers
    views: 5000000,
    createdAt: new Date("2021-08-01T18:30:00.000Z"),
  },
];

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center ">
        <h1 className="h1-bold text-dark100_light900">All Question</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      {/* SEARCHBARS */}
      <div className="mt-11 flex h-40 flex-col justify-between gap-2  max-md:flex-row max-sm:flex-col max-sm:justify-evenly sm:items-start">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
        <HomeFilters />
      </div>

      {/* QUESTION CARD */}
      <div className="mt-10 flex w-full flex-col gap-6 ">
        {questions.length > 0 ? (
          questions.map((question) => {
            return (
              <QuestionCard
                _id={question._id}
                key={question._id}
                title={question.title}
                tags={question.tags}
                author={question.author}
                votes={question.votes}
                answers={question.answers}
                views={question.views}
                createdAt={question.createdAt}
              />
            );
          })
        ) : (
          <NoResults
            title=" There’s no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. our query could be the next big thing others learn from. Get
          involved! 💡"
            link="/ask-question"
            linkText="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
