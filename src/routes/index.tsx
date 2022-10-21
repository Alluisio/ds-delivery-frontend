import React, { useCallback } from "react";
import { Routes, Route } from "react-router-dom";

import MainContainer from "../components/MainContainer";
import { useAuth } from "../hooks/auth";
import Home from "../pages/Home";
import Options from "../pages/Options";
import OrderSucess from "../pages/OrderSuccess";
import SignIn from "../pages/SignInPage";

// import SignIn from "../pages/SignInPage";
// import Dashboard from "../pages/DashboardPage";
// import Page404 from "../pages/404Page";

const RoutesComponent: React.FC = () => {
  const { user } = useAuth();

  const showPagesProtected = useCallback(() => {
    if (window.location.pathname !== "/login") {
      if (user) {
        return (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/options" element={<Options />} />
            <Route path="/order/:id" element={<OrderSucess />} />
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
