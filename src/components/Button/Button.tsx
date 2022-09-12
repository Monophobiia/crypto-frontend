import React from "react";
import Loader from "components/Loader";
import cn from "classnames";

/** Possible button colors */
export enum ButtonColor {
  /** Primary button */
  primary = "primary",
  /** Secondary button */
  secondary = "secondary",
}

/** Props for button component */
export type ButtonProps = React.PropsWithChildren<{
  /**
   * If true, then Loader is showing with children inside a button
   * The button is disabled if there's a Loader inside
   * Default - false
   */
  loading?: boolean;
  /** Button color, default -  ButtonColor.primary*/
  color?: ButtonColor;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  loading,
  color = ButtonColor.primary,
  disabled,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={cn(
        className,
        "button",
        `button_color-${color}`,
        disabled || loading ? "button_disabled" : ""
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {children} {loading ? <Loader /> : null}
    </button>
  );
};
