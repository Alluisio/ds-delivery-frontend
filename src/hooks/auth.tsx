import React, { createContext, useCallback, useContext, useState, useMemo } from "react";
import api from "../service/api";

interface UserDTO {
  id: number;
  uuid: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  email: string;
}

interface AuthState {
  user: UserDTO;
}

interface SingInCredentials {
  email: string;
  password: string;
}

interface AuthContextDate {
  user: UserDTO;
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
      const response = await api.post<UserDTO>("auth/login", {
        username: email,
        password,
      });

      let usuario = {} as UserDTO;

      updateLastLoginCredential(email);

      const dataSignIn = response.data;

      if (dataSignIn.id) {
        usuario = dataSignIn;
      }

      // const token = response.headers.authorization;
      // const decoded: TokenProps = jwtDecode(token);

      // const user = decoded.auth.usuario;

      // localStorage.setItem("@Balandrau: token", token);
      localStorage.setItem("@DsDelivery: user", JSON.stringify(usuario));

      // api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ user: usuario });
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
