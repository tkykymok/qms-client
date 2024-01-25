import React, { FC, FormEvent } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

interface SearchFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const SearchForm: FC<SearchFormProps> = ({ onSubmit }) => (
  <form onSubmit={onSubmit}>
    <Input type="text" placeholder="Search..." />
    <Button onClick={() => {}}>Search</Button>
  </form>
);

export default SearchForm;
