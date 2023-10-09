import Link from "next/link";
import React from "react";

interface Props {
  _id: number;
  name: string;
  totalQuestions: number;
  showCount: boolean;
}

const RenderTag = ({ _id, name, totalQuestions, showCount }: Props) => {
  return <Link href={`/tags/${_id}`} className="flex justify-between"></Link>;
};

export default RenderTag;
