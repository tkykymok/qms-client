import React, { FC, ReactNode } from "react";

interface TagProps {
  backgroundColor?: string;
  children?: ReactNode;
}

const Tag: FC<TagProps> = ({ backgroundColor = "", children }) => {
  const style = {
    backgroundColor: backgroundColor,
  };

  return (
    <div style={style} className="inline-block py-0 px-2 rounded-lg">
      {children}
    </div>
  );
};

export default Tag;
