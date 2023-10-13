/* eslint-disable no-useless-catch */
"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";

export async function createQuestions(params: any) {
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
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// NOTES ---findOneAndUpdate

/* This method is used to search for a tag with a specific name.

{ name: { $regex: new RegExp(^${tag}$, "i") } }: This part of the query is using a regular expression to perform a case-insensitive search for a tag with the given tag name. The ^ symbol denotes the start of the string, and the i flag makes the search case-insensitive.

{ $setOnInsert: { name: tag }, $push: { questions: question._id } }: If the tag is found, it will be updated with this operation. If not found (thanks to the upsert: true option), a new tag with the specified tag name will be inserted. This operation also pushes the _id of a question into the questions array of the tag, associating the question with the tag.

{ upsert: true, new: true }: These options indicate that if the tag does not exist (upsert: true), it should be inserted as a new tag, and the new: true option ensures that the method returns the updated (or newly created) tag document. */
