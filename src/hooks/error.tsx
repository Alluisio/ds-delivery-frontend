/* eslint-disable no-unused-vars */
import React, { createContext, useCallback, useContext, useMemo, useRef } from "react";
import { Toast as PrimeToast, ToastMessageType } from "primereact/toast";
import { AxiosError } from "axios";
import { IAppError } from "../errors/AppErrorInterfaces";
import { useToast } from "./toast";

interface ErrorContextData {
  handleError(errorProps: ErrorProps): void;
}

export interface ErrorProps {
  error: Error | AxiosError | any;
  action: string;
  knownErrors: IAppError[];
}

export interface ProblemaCampo {
  nome: string;
  mensagem: string;
}

const ErrorContext = createContext<ErrorContextData>({} as ErrorContextData);

const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toast = useRef<PrimeToast>(null);
  const { showToast } = useToast();

  const isAsaasError = (code: string) => {
    return code === "Erro de integração com api do ASAAS";
  };

  const showErrorToast = useCallback(
    ({ message, title }: IAppError, action: string) => {
      showToast({
        type: "warn",
        title: `${title || "Ops..."}`,
        description: `Não foi possível ${action}. ${message}`,
      });
    },
    [showToast]
  );

  const handleError = useCallback(
    ({ error, action, knownErrors }: ErrorProps) => {
      if (error && error.response && error.response.data.titulo) {
        const errorCode: string = error.response.data.titulo;
        const camposProblema: ProblemaCampo[] | undefined = error.response.data.campos;
        if (isAsaasError(errorCode)) {
          if (camposProblema) {
            camposProblema.forEach((campo) => {
              const errorToShow: IAppError = { code: errorCode, title: errorCode, message: campo.mensagem };
              showErrorToast(errorToShow, action);
            });
            return;
          }
          const errorToShow: IAppError = { code: errorCode, title: errorCode, message: "Erro inesperado." };
          showErrorToast(errorToShow, action);
          // eslint-disable-next-line no-console
          console.error(error);
          return;
        }
        const errorFound = knownErrors.find((err) => errorCode.includes(err.code));
        if (errorFound) {
          showErrorToast(errorFound, action);
          return;
        }
      }
      // eslint-disable-next-line no-console
      console.error(error);
      showToast({
        type: "error",
        title: `Alguma coisa deu errado ao ${action}.`,
        description: "Tente novamente ou contate nosso time de suporte para solicitar ajuda.",
      });
      // eslint-disable-next-line no-console
      console.error(error);
    },
    [showErrorToast, showToast]
  );

  const handleErrorProviderMemo = useMemo(() => {
    return { handleError };
  }, [handleError]);

  return (
    <ErrorContext.Provider value={handleErrorProviderMemo}>
      <PrimeToast ref={toast} />
      {children}
    </ErrorContext.Provider>
  );
};

function useError(): ErrorContextData {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error("useError must be used within a ErrorProvider");
  }

  return context;
}

export { ErrorProvider, useError };
