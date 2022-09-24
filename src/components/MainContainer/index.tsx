import React from "react";
import TopBarMenu from "../TobBarMenu";
import FooterBar from "../FooterBar";
import { useAuth } from "../../hooks/auth";

const MainContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <div>
          <TopBarMenu />
          <div className="main-content">{children}</div>
          <FooterBar />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default MainContainer;
