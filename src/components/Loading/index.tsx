import React from "react";

type LoadingProps = {
  isLoading: boolean;
  color?: string;
  size?: number;
};

const Loading: React.FC<LoadingProps> = ({ isLoading, size, color }) => {
  if (isLoading)
    return (
      <section className="quadrados">
        <div className="quadrado q1" style={{ width: size, height: size, background: color }} />
        <div className="quadrado q2" style={{ width: size, height: size, background: color }} />
        <div className="quadrado q3" style={{ width: size, height: size, background: color }} />
        <div className="quadrado q4" style={{ width: size, height: size, background: color }} />
      </section>
    );

  return <></>;
};

Loading.defaultProps = {
  color: "#fff",
  size: 20,
};

export default Loading;
