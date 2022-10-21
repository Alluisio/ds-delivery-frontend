import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Message } from "primereact/message";
import * as Yup from "yup";

import { useNavigate } from "react-router-dom";
import getValidationErrors from "../../utils/getValidationErrors";

import Loading from "../../components/Loading";
import { useAuth } from "../../hooks/auth";
import packageJson from "../../../package.json";

// import logo from "../../assets/img/balandrau-logo.svg";
// import logoNome from "../../assets/img/balandrau-logo-nome.svg";
import background from "../../assets/img/sign-in-background.png";
import logo from "../../assets/img/entregador.svg";

type SignInFormData = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const { version } = packageJson;
  const { signIn, lastLoginCredential } = useAuth();
  const [emailValue, setEmailValue] = useState(lastLoginCredential || "");
  const [passwordValue, setPasswordValue] = useState("");
  const [erroSignIn, setErroSignIn] = useState("");
  const [load, setLoad] = useState(false);
  const [erroEmail, setErroEmail] = useState<string | undefined>("");
  const [erroPassword, setErroPassword] = useState<string | undefined>("");

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

  return (
    <div className="signin-container">
      <img className="signin-background-image" src={background} alt="Imagem contendo alguns lanches" />
      <div className="signin-content">
        <div className="animationContainer">
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
                {load && <Loading isLoading={load} size={10} color="#fff" />}
              </Button>
            </form>
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
