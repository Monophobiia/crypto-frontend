import React from "react";
import classnames from "classnames";

/** Props for Input component */
export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Field value */
  value: string;
  /** Callback, called when entering a value */
  onChange: (value: string) => void;
};

export const Input: React.FC<InputProps> = ({
  value = "",
  className,
  onChange,
  ...rest
}: InputProps) => {
  function handleChange(event) {
    if (typeof onChange === "function") {
      onChange(event.target.value);
    }
  }

  return (
    <input
      value={value}
      type="text"
      className={classnames(
        { ...rest }.disabled ? "input_disabled" : "",
        className
      )}
      onChange={handleChange}
      {...rest}
    ></input>
  );
};
