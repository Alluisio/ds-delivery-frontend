/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import * as Yup from "yup";

import { validate as validEmail } from "email-validator";

import { useNavigate } from "react-router-dom";
import _ from "lodash";
import getValidationErrors from "../../utils/getValidationErrors";

import Loading from "../../components/Loading";
import { useAuth } from "../../hooks/auth";
import packageJson from "../../../package.json";

import background from "../../assets/img/sign-in-background.png";
import logo from "../../assets/img/entregador.svg";
import api from "../../service/api";
import { useToast } from "../../hooks/toast";

type SignInFormData = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const { showToast } = useToast();
  const { version } = packageJson;
  const { signIn, lastLoginCredential } = useAuth();
  const [emailValue, setEmailValue] = useState(lastLoginCredential || "");
  const [passwordValue, setPasswordValue] = useState("");
  const [load, setLoad] = useState(false);
  const [errorsState, setErrorsState] = useState<{ [key: string]: string }>({});

  const [createUser, setCreateUser] = useState(false);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SignInFormData>({ mode: "all", reValidateMode: "onChange" });

  const onSubmit = async (data: SignInFormData) => {
    try {
      setLoad(true);
      setErrorsState({});
      const schema = Yup.object().shape({
        email: Yup.string().required("E-mail é obrigatório").email("Insira um e-mail válido"),
        password: Yup.string().required("Senha obrigatória"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (!data.email.includes("@")) {
        const newEmail = data.email.replaceAll(".", "").replace("-", "");
        await signIn({
          email: newEmail,
          password: data.password,
        });
      } else {
        await signIn({
          email: data.email,
          password: data.password,
        });
      }

      await signIn({
        email: data.email,
        password: data.password,
      });

      if (localStorage.getItem("@DSDelivery: Theme")) {
        // return;
      } else {
        localStorage.setItem("@DSDelivery: Theme", "dark");
      }

      navigate("/");
    } catch (err: any) {
      const errorsLocal: { [key: string]: string } = _.cloneDeep(errorsState);

      if (err.response) {
        if (err.response.data.message === "E-mail não encontrado.") {
          errorsLocal.credenciais = "Credenciais incorretas.";
        }
      } else if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);
        errorsLocal.email = error.email;
      } else {
        errorsLocal.servidor = "Servidor indisponível, tente novamente mais tarde.";
      }
      setErrorsState(errorsLocal);
    } finally {
      setLoad(false);
    }
  };

  function handleEnter(event: any) {
    if (event.keyCode === 13) {
      const { form } = event.target;
      const indexof = Array.prototype.indexOf.call(form, event.target);
      form.elements[indexof + 1].focus();
      event.preventDefault();
    }
  }

  const validCreateAccount = useCallback(() => {
    const errorsLocal: { [key: string]: string } = _.cloneDeep(errorsState);

    if (_.isEmpty(firstName)) {
      errorsLocal.firstNameCreate = "O campo nome é obrigatório";
    }

    if (_.isEmpty(lastName)) {
      errorsLocal.lastNameCreate = "O campo sobrenome é obrigatório";
    }

    if (_.isEmpty(email)) {
      errorsLocal.emailCreate = "O campo email é obrigatório";
    }

    if (!validEmail(email)) {
      errorsLocal.emailCreate = "Insira um e-mail válido";
    }

    if (_.isEmpty(password)) {
      errorsLocal.passwordCreate = "O campo senha é obrigatório";
    }

    setErrorsState(errorsLocal);
    return _.isEmpty(errorsLocal);
  }, [email, errorsState, firstName, lastName, password]);

  const resetFieldsCreateAccount = useCallback(() => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  }, []);

  const handleCreateAccount = useCallback(() => {
    if (validCreateAccount()) {
      api
        .post("auth/create-account", {
          firstName,
          lastName,
          email,
          password,
        })
        .then(() => {
          resetFieldsCreateAccount();
          setCreateUser(false);
          showToast({
            type: "success",
            title: "Sua conta foi criada com sucesso",
            description: "Faça login com os dados informados",
          });
        })
        .catch((err) => {
          if (err.response.data.message === "E-mail já cadastrado.") {
            return;
          }

          showToast({
            type: "error",
            title: "Não foi possível criar conta",
            description: "Tente novamente ou entre em contato com os administradores",
          });
        });
    }
  }, [email, firstName, lastName, password, resetFieldsCreateAccount, showToast, validCreateAccount]);

  return (
    <div className="signin-container">
      <img className="signin-background-image" src={background} alt="Imagem contendo alguns lanches" />
      <div className="signin-content">
        <div className="animationContainer">
          {!createUser ? (
            <div className="flex content-login">
              <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                <img src={logo} alt="logo do projeto" />
                <div className="mb-6">
                  <h3 className="text-center">LOGIN</h3>
                </div>

                <span className="p-float-label">
                  <InputText
                    {...register("email", { required: "Informe um E-mail, CIM ou CPF." })}
                    id="email"
                    type="text"
                    value={emailValue}
                    onChange={(e) => {
                      setEmailValue(e.target.value);
                      setValue("email", e.target.value);
                    }}
                    className={errors.email && "p-invalid"}
                    onKeyDown={(e) => handleEnter(e)}
                  />
                  <label htmlFor="username">E-mail ou username</label>
                </span>
                <div className="p-field" style={{ marginTop: 30 }}>
                  <span className="p-float-label p-input-icon-right ">
                    <Password
                      {...register("password", { required: "Informe uma Senha." })}
                      id="password"
                      toggleMask
                      feedback={false}
                      value={passwordValue}
                      onChange={(e) => {
                        setPasswordValue(e.target.value);
                        setValue("password", e.target.value);
                      }}
                      className={errors.password && "p-invalid"}
                    />
                    <label htmlFor="password">Senha</label>
                  </span>
                </div>

                <Button type="submit" className="mt-2 text-center flex justify-content-center">
                  {load ? <Loading isLoading={load} /> : <div style={{ width: "90%" }}>CONTINUAR</div>}
                </Button>

                <div
                  onClick={() => {
                    setCreateUser(true);
                  }}
                  className="mt-2 flex align-items-center justify-content-end"
                  style={{ width: "100%", cursor: "pointer" }}
                >
                  <span className="align-items-center">Ainda não sou cliente</span>
                  <span className="pi pi-angle-right" style={{ marginTop: 1 }} />
                </div>
              </form>
            </div>
          ) : (
            <div className="flex content-login">
              <form className="p-fluid" autoComplete="off">
                <img src={logo} alt="logo do projeto" />
                <div className="mb-4">
                  <h3 className="text-center">CRIAR CONTA</h3>
                </div>

                <div className="flex p-fluid mb-5">
                  <span style={{ width: "100%" }} className="p-float-label mr-2">
                    <InputText
                      id="first-name"
                      type="text"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);

                        const errorsLocal = _.cloneDeep(errorsState);
                        delete errorsLocal.firstNameCreate;
                        setErrorsState(errorsLocal);
                      }}
                      className={errorsState.firstNameCreate && "p-invalid"}
                    />
                    <label htmlFor="first-name">Nome</label>
                  </span>

                  <span style={{ width: "100%" }} className="p-float-label">
                    <InputText
                      id="last-name"
                      type="text"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);

                        const errorsLocal = _.cloneDeep(errorsState);
                        delete errorsLocal.lastNameCreate;
                        setErrorsState(errorsLocal);
                      }}
                      className={errorsState.lastNameCreate && "p-invalid"}
                    />
                    <label htmlFor="last-name">Sobrenome</label>
                  </span>
                </div>

                <div className="mb-5">
                  <span className="p-float-label">
                    <InputText
                      id="new-email"
                      type="text"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);

                        const errorsLocal = _.cloneDeep(errorsState);
                        delete errorsLocal.emailCreate;
                        setErrorsState(errorsLocal);
                      }}
                      className={errorsState.emailCreate && "p-invalid"}
                    />
                    <label htmlFor="new-email">Seu email</label>
                  </span>
                </div>

                <div>
                  <span className="p-float-label p-input-icon-right ">
                    <Password
                      id="new-password"
                      type="new-password"
                      toggleMask
                      feedback={false}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);

                        const errorsLocal = _.cloneDeep(errorsState);
                        delete errorsLocal.passwordCreate;
                        setErrorsState(errorsLocal);
                      }}
                      autoComplete="false"
                      className={errorsState.passwordCreate && "p-invalid"}
                    />
                    <label htmlFor="new-password">Senha</label>
                  </span>
                </div>

                <Button
                  type="button"
                  onClick={handleCreateAccount}
                  className="mt-2 text-center flex justify-content-center"
                >
                  <div style={{ width: "90%" }}>CRIAR</div>
                </Button>

                <div
                  onClick={() => {
                    setCreateUser(false);
                  }}
                  className="mt-2 flex align-items-center justify-content-start"
                  style={{ width: "100%", cursor: "pointer" }}
                >
                  <span className="pi pi-angle-left" style={{ marginTop: 1 }} />
                  <span className="align-items-center">Já sou cliente</span>
                </div>
              </form>
            </div>
          )}

          <div className="errors-div">
            <p className="error-message">{errorsState.credenciais}</p>
            <p className="error-message">{errorsState.email}</p>
            <p className="error-message">{errorsState.servidor}</p>
          </div>
        </div>

        <div className="animationContainer link mb-3">
          <div className="link-ajuda">
            <div className="flex">
              <p className="p-text-center mb-2">Versão</p>

              <pre> {version}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
