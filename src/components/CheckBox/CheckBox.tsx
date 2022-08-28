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
  const [isChecked, setChecked] = useState(checked);
  const toggle = (previous: boolean) => !previous;

  function handleChange() {
    onChange(!isChecked);
  }

  return (
    <input
      type="checkbox"
      checked={isChecked}
      onClick={() => setChecked(toggle)}
      onChange={handleChange}
      {...rest}
    />
  );
};
