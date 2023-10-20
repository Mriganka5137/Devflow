import { Schema, model, Document, models } from "mongoose";

export interface ITag extends Document {
  name: string;
  description?: string;
  questions: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  createdAt: Date;
}

const TagSchema = new Schema<ITag>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question", // Replace "Question" with the actual model name for questions
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User", // Replace "User" with the actual model name for users who follow the tag
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Tag = models.Tag || model<ITag>("Tag", TagSchema);

export default Tag;
