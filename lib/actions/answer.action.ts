"use server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams } from "./shared.types";
import Answer from "@/database/answer.model";
import Question from "@/database/question.model";

// Create Question Action
export async function createAnswer(params: CreateAnswerParams) {
  try {
    // connect to DB
    connectToDatabase();

    const { content, author, question, path } = params;
    // Create a Answer
    const newAnswer = new Answer({
      content,
      author,
      question,
      path,
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
