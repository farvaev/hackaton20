import React from "react";

export type InputProps = React.HTMLProps<HTMLInputElement>;

export default function Input(props: InputProps) {
  return <input {...props} />;
}
