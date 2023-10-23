"use server";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag from "@/database/tag.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();
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
    const tags = await Tag.find({});
    if (!tags) {
      throw new Error("No Tags yet");
    }

    return { tags };
  } catch (error) {
    console.log(error);
  }
}
