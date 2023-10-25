/* eslint-disable no-useless-catch */
"use server";
import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";
import {
  CreateQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
} from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

// Get all questions
export async function getQuestions(params: GetQuestionsParams) {
  try {
    // Connect to DB
    connectToDatabase();
    const questions = await Question.find({})
      .sort({ createdAt: -1 })
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      });

    return { questions };
  } catch (error) {
    console.log(error);
  }
}

// Create Question Action
export async function createQuestions(params: CreateQuestionParams) {
  try {
    // connect to DB
    connectToDatabase();

    const { title, content, tags, author, path } = params;

    // Create a Question
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    // Create the tags or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // Create an interaction record for the user's ask_question action

    // Increment author's reputation by +5

    revalidatePath(path);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getQuestionByID(params: GetQuestionByIdParams) {
  try {
    connectToDatabase();

    const { questionId } = params;

    // Get the question data
    const question = await Question.findById(questionId)
      .populate({
        path: "tags",
        model: Tag,
        select: "_id name",
      })
      .populate({
        path: "author",
        model: "User",
        select: "_id clerkId name picture",
      });

    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Upvote Question
export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();
    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

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

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found");
    }

    // Increment author's reputation by +10 for upvoting a question
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

// Down Vote Question
export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();

    const { userId, questionId, hasdownVoted, hasupVoted, path } = params;

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

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

// NOTES ---findOneAndUpdate

/* This method is used to search for a tag with a specific name.

{ name: { $regex: new RegExp(^${tag}$, "i") } }: This part of the query is using a regular expression to perform a case-insensitive search for a tag with the given tag name. The ^ symbol denotes the start of the string, and the i flag makes the search case-insensitive.

{ $setOnInsert: { name: tag }, $push: { questions: question._id } }: If the tag is found, it will be updated with this operation. If not found (thanks to the upsert: true option), a new tag with the specified tag name will be inserted. This operation also pushes the _id of a question into the questions array of the tag, associating the question with the tag.

{ upsert: true, new: true }: These options indicate that if the tag does not exist (upsert: true), it should be inserted as a new tag, and the new: true option ensures that the method returns the updated (or newly created) tag document. */
