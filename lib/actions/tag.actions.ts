"use server";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";
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
