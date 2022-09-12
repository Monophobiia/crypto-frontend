import React from "react";
import Loader from "components/Loader";

/** Props for WithLoader component */
export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;

export const WithLoader: React.FC<WithLoaderProps> = ({
  loading,
  children,
}: WithLoaderProps) => {
  return (
    <div>
      {loading ? <Loader /> : null}
      {children}
    </div>
  );
};
