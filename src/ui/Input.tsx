import React from "react";

export type InputProps = React.HTMLProps<HTMLInputElement>;

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={
        "px-2 py-1 border border-solid border-Black/50 focus-within:border-Black rounded-md inline-block" +
        ` ${props.className}`
      }
    />
  );
}
