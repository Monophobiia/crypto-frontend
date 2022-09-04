import React from "react";
import { useState } from "react";

/** Props for CheckBox component */
type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Called on checkbox click */
  onChange: (value: boolean) => void;
};

export const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  onChange,
  ...rest
}: CheckBoxProps) => {
  function handleChange() {
    onChange(!checked);
  }

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={handleChange}
      {...rest}
    />
  );
};
