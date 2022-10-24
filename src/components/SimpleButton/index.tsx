import { Button } from "primereact/button";
import React from "react";

interface Props {
  command: () => void;
  label: string;
  icon: string;
}

const SimpleButton: React.FC<Props> = ({ command, label, icon }) => {
  return (
    <div className="mb-1 pl-1 simple-button">
      <Button className="flex justify-content-start p-button-text" onClick={() => command()}>
        <i className={`mr-3 ${icon}`} style={{ color: "#fff" }} />
        <div style={{ color: "#fff" }}>{label}</div>
      </Button>
    </div>
  );
};

export default SimpleButton;
