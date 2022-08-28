import { useState } from "react";
import React from "react";
import styles from "@styles/MultiDropdown.module.scss";

/** Dropdown option */
export type Option = {
  /** Option key */
  key: string;
  /** Option value shown to user */
  value: string;
};

/** Props for Dropdown component */
type MultiDropdownProps = {
  /** Array of possible options */
  options: Option[];
  /** Current chosen options, can be empty */
  value: Option[];
  /** Called on value selection */
  onChange: (value: Option[]) => void;
  /** If dropdown is disabled */
  disabled?: boolean;
  /** Transforming chosen options to string, shown as value in dropdown */
  pluralizeOptions: (value: Option[]) => string;
};

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled,
  pluralizeOptions,
}: MultiDropdownProps) => {
  const [open, setOpen] = useState(false),
    toggle = () => {
      if (!disabled) setOpen(!open);
    };

  function handleOnClick(item) {
    let onChangeParam: Option[];

    if (value.includes(item))
      onChangeParam = value.filter(
        (optionsItem) => optionsItem.key !== item.key
      );
    else onChangeParam = [item];

    onChange(onChangeParam);
  }

  return (
    <div className={styles.multidropdown}>
      <div tabIndex={0} role="button" onClick={() => toggle()}>
        <div>
          <p>{pluralizeOptions(value)}</p>
        </div>
        {/* Can use this to show arrow/button that opens a dropdown */}
        {/* <div>
          <p>{open ? "Close" : "Open"}</p>
        </div> */}
      </div>
      {open && !disabled && (
        <ul className={styles.multidropdown__menu}>
          {options.map((item) => (
            <li key={item.key} className={styles["multidropdown__button-li"]}>
              <button
                type="button"
                onClick={() => handleOnClick(item)}
                className={styles.multidropdown__button}
              >
                {item.value}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
