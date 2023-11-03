"use server";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import Tag, { ITag } from "@/database/tag.model";
import Question from "@/database/question.model";
import { FilterQuery } from "mongoose";
import error from "next/error";
import { questions, tags } from "@/constants";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    await connectToDatabase();
    const { userId } = params;

    // Find the User first
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Find Interactions for the user and group by tags

    return [
      { _id: "1", name: "Tag 1" },
      { _id: "2", name: "Tag 2" },
    ];
  } catch (error) {
    console.log(error);
  }
}

//  Get all Tags
export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();
    const { searchQuery } = params;

    const query: FilterQuery<typeof Tag> = {};
    if (searchQuery) {
      query.$or = [
        {
          name: { $regex: new RegExp(searchQuery, "i") },
        },
      ];
    }

    const tags = await Tag.find(query);
    if (!tags) {
      throw new Error("No Tags yet");
    }

    return { tags };
  } catch (error) {
    console.log(error);
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    await connectToDatabase();
    const { tagId, page = 1, pageSize = 10, filter, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    const questions = tag.questions;

    return { tagTitle: tag.name, questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getPopularTags() {
  try {
    connectToDatabase();
    // const popularTags = await Tag.find({}).sort({ questions: -1 }).limit(5);

    const popularTags = await Tag.aggregate([
      {
        $project: {
          name: 1,
          _id: 1,
          questions: {
            $size: "$questions",
          },
        },
      },
      {
        $sort: { questions: -1 },
      },
      { $limit: 5 },
    ]);

    // console.log(popularTags);
    return popularTags;
  } catch (error) {
    console.log(error);
  }
}
