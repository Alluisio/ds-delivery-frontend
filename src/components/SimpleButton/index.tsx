import { Button } from "primereact/button";
import React from "react";

interface Props {
  command: () => void;
  label?: string;
  icon?: string;
  children?: React.ReactNode;
}

const SimpleButton: React.FC<Props> = ({ command, label, icon, children }) => {
  return (
    <div className="mb-1 pl-1 simple-button">
      <Button className="flex justify-content-start p-button-text" onClick={() => command()}>
        {label && icon && !children ? (
          <>
            <i className={`mr-3 ${icon}`} style={{ color: "#fff" }} />
            <div style={{ color: "#fff" }}>{label}</div>
          </>
        ) : (
          children
        )}
      </Button>
    </div>
  );
};

SimpleButton.defaultProps = {
  label: "",
  icon: "",
  children: undefined,
};

export default SimpleButton;
