"use client";
import { HomePageFilters } from "@/constants/filters";
import React from "react";
import { Button } from "../ui/button";

const HomeFilters = () => {
  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((filter) => {
        return (
          <Button key={filter.value} onClick={() => {}} className="">
            {filter.name}
          </Button>
        );
      })}
    </div>
  );
};

export default HomeFilters;
