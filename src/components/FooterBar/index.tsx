import React from "react";

const FooterBar: React.FC = () => {
  return (
    <div
      className="flex"
      style={{
        backgroundColor: "#263238",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>App desenvolvido durante a aula de Tópicos Integradores</p>
    </div>
  );
};

export default FooterBar;
