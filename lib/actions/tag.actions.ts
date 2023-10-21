import { connectToDatabase } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();
  } catch (error) {
    console.log(error);
  }
}
