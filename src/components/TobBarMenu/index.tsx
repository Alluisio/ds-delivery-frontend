/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import { useNavigate } from "react-router-dom";

const TopBarMenu: React.FC = () => {
  const nagivate = useNavigate();

  return (
    <div
      className="flex align-items-center top-bar-container"
      style={{
        height: 60,
        backgroundColor: "#FF5371",
        paddingLeft: 40,
      }}
    >
      <img src="" alt="" />
      <p
        style={{ fontWeight: "bold", cursor: "pointer" }}
        onClick={() => {
          nagivate("/");
        }}
      >
        SIX Delivery
      </p>
    </div>
  );
};

export default TopBarMenu;
