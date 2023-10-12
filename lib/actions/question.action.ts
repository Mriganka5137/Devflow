/* eslint-disable no-useless-catch */
"use server";

import { connectToDatabase } from "../mongoose";

export async function createQuestions(params: any) {
  try {
    // connect to DB
    connectToDatabase();
  } catch (err) {
    console.log(err);
    throw err;
  }
}
