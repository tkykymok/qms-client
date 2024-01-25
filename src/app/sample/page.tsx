"use client";

import React from "react";
import SearchForm from "@/components/molecules/SearchForm";

const Page = () => {
  return (
    <div>
      <p>Welcome to my website!</p>
      <SearchForm
        onSubmit={(event) => {
          event.preventDefault(); /* 検索処理 */
        }}
      />
    </div>
  );
};

export default Page;
