import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import React from "react";

const Community = () => {
  return (
    <section>
      <h1 className="h1-bold">All Users</h1>
      <div className="mt-11 flex justify-between max-sm:flex-col">
        <LocalSearchbar
          route=""
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search by username..."
        />
      </div>
    </section>
  );
};

export default Community;
