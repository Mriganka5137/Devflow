//
/*
    1. Answer
    2. User
    3. QuestionId
    4. CreatedAt
    5. Upvotes & Downvotes (Array of User)
    6. Author
*/

import { Schema, Document, model, models } from "mongoose";

//  1. Create an Answer Interface
export interface IAnswer extends Document {
  author: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
  content: string;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  createdAt: Date;
}

// 2. Create the Answer Schema
const AnswerSchema = new Schema<IAnswer>({
  content: {
    type: String,
    required: true,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  upvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  downvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
// 3. Create Answer Model

const Answer = models.Answer || model("Answer", AnswerSchema);

export default Answer;
