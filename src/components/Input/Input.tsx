import React from "react";
import cn from "classnames";

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

const Input: React.FC<InputProps> = ({
  value = "",
  className,
  onChange,
  disabled,
  ...rest
}: InputProps) => {
  function handleChange(event) {
    onChange(event.target.value);
  }

  return (
    <input
      value={value}
      type="text"
      className={cn(disabled ? "input_disabled" : "", className)}
      onChange={handleChange}
      {...rest}
    ></input>
  );
};

export default Input;
