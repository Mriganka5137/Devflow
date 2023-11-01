// "use client";
import ProfileEdit from "@/components/forms/ProfileEdit";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const mongoUser = await getUserById({ userId });

  return (
    <>
      <h1 className=" h1-bold">Edit Profile</h1>
      <div>
        <ProfileEdit mongoUser={JSON.stringify(mongoUser)} clerkId={userId} />
      </div>
    </>
  );
};

export default page;
