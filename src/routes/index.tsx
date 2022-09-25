import React, { useCallback, useState } from "react";
import { Routes, Route } from "react-router-dom";

import MainContainer from "../components/MainContainer";
import Home from "../pages/Home";
import Options from "../pages/Options";
import SignIn from "../pages/SignInPage";

// import SignIn from "../pages/SignInPage";
// import Dashboard from "../pages/DashboardPage";
// import Page404 from "../pages/404Page";

const RoutesComponent: React.FC = () => {
  const [user] = useState<string | null>(localStorage.getItem("@DsDelivery: user"));

  const showPagesProtected = useCallback(() => {
    if (window.location.pathname !== "/login") {
      if (user) {
        return (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/options" element={<Options />} />
          </>
        );
      }
      window.location.href = "/login";
    }

    return <></>;
  }, [user]);
  return (
    <MainContainer>
      <Routes>
        {showPagesProtected()}

        <Route path="/login" element={<SignIn />} />
      </Routes>
    </MainContainer>
  );
};

export default RoutesComponent;
