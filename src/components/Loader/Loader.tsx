import React from "react";
import classnames from "classnames";

/** Possible Loader sizes */
export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

/** Props for Loader component */
type LoaderProps = {
  /**
   * Check if something is loading.
   * By default - true
   * If false, then loader is not showing
   */
  loading?: boolean;
  /**
   * Loader size. Adding a css-class - loader_size-{size}, if present
   * By default: LoaderSize.m, css-class - loader_size-m
   */
  size?: LoaderSize;
  /**
   * Additional CSS-classes.
   */
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({
  loading = true,
  size = LoaderSize.m,
  className,
}: LoaderProps) => {
  if (loading)
    return <div className={classnames(className, "loader_size-" + size)}></div>;
};

export default Loader;
