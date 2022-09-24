import React from "react";

import { AuthProvider } from "./auth";
import { ToastProvider } from "./toast";
import { ErrorProvider } from "./error";

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <ErrorProvider>{children}</ErrorProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
