"use server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import Answer from "@/database/answer.model";
import Question from "@/database/question.model";

// Create Question Action
export async function createAnswer(params: CreateAnswerParams) {
  try {
    // connect to DB
    connectToDatabase();

    const { content, author, question, path } = params;
    // Create a Answer
    const newAnswer = await Answer.create({
      content,
      author,
      question,
    });

    // Add Answer to the question's array
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // TODO : Add Interactions
    revalidatePath(path);
  } catch (err) {
    console.log(err);
    throw err;
  }
}
// Get All Answers of a Given Question
export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();
    const { questionId } = params;

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    console.log(error);
  }
}
//  Upvote Answer
export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    // Update Query to pass
    let updateQuery = {};

    // if already upvoted ---> remove from upvotes
    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    }
    // if downvoted ---> remove from downvotes and add to upvote
    else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    }
    // If did not do anything yet---> just add to upvotes
    else {
      updateQuery = {
        $addToSet: { upvotes: userId },
      };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    // Increment author's reputation by +10 for upvoting a answer
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

// Down Vote Answer
export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();

    const { userId, answerId, hasdownVoted, hasupVoted, path } = params;

    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: { downvotes: userId },
      };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
