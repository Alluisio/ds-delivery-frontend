import React from "react";

type LoadingProps = {
  isLoading: boolean;
};

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  if (isLoading) return <span className="loader" />;

  return <></>;
};

export default Loading;
