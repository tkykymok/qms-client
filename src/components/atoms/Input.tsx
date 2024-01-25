import React, { FC } from "react";

interface InputProps {
  type: string;
  placeholder?: string;
}

const Input: FC<InputProps> = ({ type, placeholder }) => (
  <input type={type} placeholder={placeholder} />
);

export default Input;
