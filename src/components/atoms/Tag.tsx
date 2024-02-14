import React, { FC, ReactNode } from "react";
import { TagColor, WHITE } from "@/types/model/type";

interface TagProps {
  backgroundColor?: TagColor;
  children?: ReactNode;
}

const Tag: FC<TagProps> = ({ backgroundColor = WHITE, children }) => {
  const style = {
    backgroundColor: backgroundColor,
  };

  return (
    <div
      style={style}
      className="text-neutral-600 inline-block py-0 px-2 rounded-lg"
    >
      {children}
    </div>
  );
};

export default Tag;
