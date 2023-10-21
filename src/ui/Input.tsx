import React from "react";

export type InputProps = React.HTMLProps<HTMLInputElement>;

export default function Input(props: InputProps) {
  return (
    <input
      className="p-2 border border-solid border-Black rounded-sm inline-block"
      {...props}
    />
  );
}
