import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}
const Input: React.FC<Props> = (props) => {
  const { ...rest } = props;

  return <input {...rest} className="input" />;
};

export default Input;
