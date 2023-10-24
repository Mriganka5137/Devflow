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
  answer: string;
  question: Schema.Types.ObjectId;
  upvotes: number;
  downvotes: number;
  createdAt: Date;
  author: Schema.Types.ObjectId;
}

// 2. Create the Answer Schema
const AnswerSchema = new Schema<IAnswer>({
  answer: {
    type: String,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
  },
  upvotes: {
    type: Number,
  },
  downvotes: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: Schema.Types.ObjectId,
  },
});
// 3. Create Answer Model

const Answer = models.Answer || model("Answer", AnswerSchema);

export default Answer;
