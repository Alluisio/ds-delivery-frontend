import React, { createContext, useCallback, useContext, useState, useMemo } from "react";

interface ResponseLogin {
  uuid: string;
  nome: string;
  email: string;
}

interface AuthState {
  user: ResponseLogin;
}

interface SingInCredentials {
  email: string;
  password: string;
}

interface AuthContextDate {
  user: ResponseLogin;
  // eslint-disable-next-line no-unused-vars
  signIn(credentials: SingInCredentials): Promise<void>;
  signOut(): void;
  lastLoginCredential?: string;
}

const AuthContext = createContext<AuthContextDate>({} as AuthContextDate);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lastLoginCredential, setLastLoginCredential] = useState(() => {
    const lastCredential = localStorage.getItem("@DsDelivery: lastLoginCredential");
    if (lastCredential) return lastCredential;
    return undefined;
  });

  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem("@DsDelivery: user");
    if (user) {
      return {
        user: JSON.parse(user),
      };
    }

    return {} as AuthState;
  });

  const updateLastLoginCredential = useCallback((credential: string) => {
    localStorage.setItem("@DsDelivery: lastLoginCredential", credential);
    setLastLoginCredential(credential);
  }, []);

  const signIn = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      updateLastLoginCredential(email);
      const userFake: ResponseLogin = { uuid: "1", nome: "Fake user", email: "fake@fake.com" };
      // eslint-disable-next-line no-console
      console.log(email, password);

      localStorage.setItem("@DsDelivery: user", JSON.stringify(userFake));

      setData({ user: userFake });
    },
    [updateLastLoginCredential]
  );

  const signOut = useCallback(() => {
    localStorage.removeItem("@DsDelivery: user");

    setData({} as AuthState);
  }, []);

  const providerInfo = useMemo(() => {
    return { user: data.user, signIn, signOut, lastLoginCredential };
  }, [data.user, lastLoginCredential, signIn, signOut]);

  return <AuthContext.Provider value={providerInfo}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextDate {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
