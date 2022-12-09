import { useState, ChangeEvent } from "react";
import { useInputProps } from "./use-input.types";

export const useInput = (props: useInputProps) => {
  const { regexp } = props;

  const [input, setInput] = useState("");
  const [inputIsValid, setInputIsValid] = useState(true);

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.value.trim().match(regexp)
      ? setInputIsValid(true)
      : setInputIsValid(false);
    setInput(event.target.value.trim());
  };

  return {
    value: input,
    error: inputIsValid,
    changeHandler: inputChangeHandler,
  };
};
