"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/interaction.model";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await connectToDatabase();
    const { questionId, userId } = params;

    // Increment the value of views in Question model
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

    // 1. Check if  the userId is valid
    // 2. CHeck if the user has already interacted with the question
    // 3. If he did, then return
    // 4. If he did not, Create one interaction

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction) {
        console.log("User already viewed");
        return;
      }

      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
