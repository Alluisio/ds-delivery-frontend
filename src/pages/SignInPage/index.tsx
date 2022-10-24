/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Message } from "primereact/message";
import * as Yup from "yup";

import { validate as validEmail } from "email-validator";

import { useNavigate } from "react-router-dom";
import _ from "lodash";
import getValidationErrors from "../../utils/getValidationErrors";

import Loading from "../../components/Loading";
import { useAuth } from "../../hooks/auth";
import packageJson from "../../../package.json";

// import logo from "../../assets/img/balandrau-logo.svg";
// import logoNome from "../../assets/img/balandrau-logo-nome.svg";
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
  const [erroSignIn, setErroSignIn] = useState("");
  const [load, setLoad] = useState(false);
  const [erroEmail, setErroEmail] = useState<string | undefined>("");
  const [erroPassword, setErroPassword] = useState<string | undefined>("");

  const [createUser, setCreateUser] = useState(false);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // const history = useHistory();
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
      setErroSignIn("");
      const schema = Yup.object().shape({
        email: Yup.string().required("E-mail é obrigatório"),
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

      if (localStorage.getItem("@Balandrau: Theme")) {
        // return;
      } else {
        localStorage.setItem("@Balandrau: Theme", "dark");
      }

      navigate("/");
    } catch (err: any) {
      if (err.response) {
        if (
          err.response.data.titulo === "Usuário não encontrado." ||
          err.response.data.titulo === "Usuário ou senha incorreto." ||
          err.response.data.titulo === "E-mail não encontrado."
        ) {
          setErroSignIn("Credenciais incorretas.");
        }
      } else if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);
        setErroSignIn(error.email);
      } else {
        setErroSignIn("Servidor indisponível, tente novamente mais tarde.");
      }
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    if (errors) setErroEmail(errors.email?.message);
    if (errors) setErroPassword(errors.password?.message);
  }, [errors, errors.email?.message, errors.password]);

  // eslint-disable-next-line no-unused-vars
  const showErro = (erro: string, onClose: (value: string) => void) => {
    return (
      <Message
        className="p-mb-2"
        severity="warn"
        content={
          <>
            <i className="pi pi-times-circle" />
            <span className="p-ml-2">{erro}</span>
            <Button
              icon="pi pi-times"
              className="p-ml-2 p-button-text p-button-danger p-button-rounded signin-close-error-button"
              onClick={() => onClose("")}
            />
          </>
        }
      />
    );
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
    if (_.isEmpty(firstName) || _.isEmpty(lastName) || _.isEmpty(email) || _.isEmpty(password) || !validEmail(email)) {
      return false;
    }
    return true;
  }, [email, firstName, lastName, password]);

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
                  <div style={{ width: "90%" }}>CONTINUAR</div>
                  {/* {load && <Loading isLoading={load} size={10} color="#fff" />} */}
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
                        // setEmailValue(e.target.value);
                        // setValue("email", e.target.value);
                      }}
                      // className={errors.emailCad && "p-invalid"}
                      // onKeyDown={(e) => handleEnter(e)}
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
                        // setEmailValue(e.target.value);
                        // setValue("email", e.target.value);
                      }}
                      // className={errors.emailCad && "p-invalid"}
                      // onKeyDown={(e) => handleEnter(e)}
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
                        // setEmailValue(e.target.value);
                        // setValue("email", e.target.value);
                      }}
                      // className={errors.emailCad && "p-invalid"}
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
                      }}
                      autoComplete="false"
                      className={errors.password && "p-invalid"}
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
                  {/* {load && <Loading isLoading={load} size={10} color="#fff" />} */}
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
