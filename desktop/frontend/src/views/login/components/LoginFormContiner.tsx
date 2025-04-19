import { useState, useEffect } from "react";
import { classNames } from "primereact/utils";
import { Form, Formik } from "formik";
import { LoginForm } from "./LoginForm";
import logoLogin from "../../../images/LogoSunnix.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";

import { Button, TwoFactorField } from "../../../modules/commons";
import { UserLoginFA } from "../../../models";

import { useLogin, useLoginFA } from "../../../hooks";

const LoginFormContiner = ({ relad }: Props) => {
  const [error, setError] = useState<Error>();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLogin } = useLogin(setError, setShowTwoFactor, relad);
  const { loginFA, isLoginFA } = useLoginFA(setError);

  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const onSubmit = (userData: UserLogin) => {
    login(userData);
  };
  const onSubmitFA = (userData: UserLoginFA) => {
    loginFA(userData);
  };
  useEffect(() => {
    relad();
  }, [isLogin]);
  return (
    <div className="h-screen flex items-center justify-center flex-col">

      {/* <img alt="SunissUp" src={logoLogin} className="w-1/3 sm:w-4/12 md:w-3/12" style={{ position: "relative", top: "50px", borderColor: "#021539" }} /> */}
      <img className="relative w-48 sm:w-48 md:w-1/5 xl:w-1/5" alt="Sunnix" src={logoLogin} style={{ top: "50px", borderColor: "#021539" }} />
      <div className="relative w-96 sm:w-96 md:w-1/4 xl:w-1/4 p-4 rounded-lg mt-20 text-primary ">
        <div className="layer1 sticky border-8 border-secondary-hover rounded-lg bg-secondary-focus" style={{ borderBottomLeftRadius: "100%" }}></div>
        <div className="layer2 sticky rounded-lg bg-secondary-hover" style={{ borderTopLeftRadius: "100%" }}></div>
        {showTwoFactor ? (
          <>
            <h1 className="mb-2 text-gray-100">Two factor</h1>
            <div className="border-2 p-4 border-secondary rounded-lg w-4/5 lg:w-1/5 flex flex-col items-center bg-gray-100">
              <FontAwesomeIcon icon={faUserShield} className="h-12 mb-4" />
              <Formik
                initialValues={{ username, password, code: "" } as UserLoginFA}
                onSubmit={onSubmitFA}
                enableReinitialize
              >
                <Form>
                  <TwoFactorField field="code" />
                  <Button
                    type="submit"
                    label="Login"
                    className="button-primary w-full"
                    loading={isLoginFA}
                    disabled={isLoginFA}
                  />
                </Form>
              </Formik>
            </div>
          </>
        ) : (
            <Formik
            initialValues={{ username: "", password: "", token: turnstileToken } as UserLogin}
            onSubmit={onSubmit}
            enableReinitialize
            >
            <Form>
              <LoginForm setUsername={setUsername} setPassword={setPassword} setTurnstileToken={setTurnstileToken} />
              <div className="flex">
                <div className="w-2/3"></div>
                <Button
                  label="Login"
                  type="submit"
                  disabled={turnstileToken === "" || username === "" || password === ""}
                  className="h-12 w-1/3 bg-primary hover:bg-secondary-focus flex justify-center items-center"
                  loading={isLogin}
                />
              </div>
            </Form>
          </Formik>
        )}
      </div>
      <div
        className={classNames(
          "flex flex-row bg-secondary shadow-lg w-1/2 sm:w-1/3 mt-2 text-white rounded p-2 lg:w-1/5 ",
          !error && "invisible"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current flex-shrink-0 h-6 w-6 ml-2"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="flex flex-col ml-2">
          <span> Wrong username or password</span>
          <span> {error?.message}</span>
        </div>
      </div>
    </div>
  );
};

type UserLogin = {
  username: string;
  password: string;
  token: string;
};
type Props = {
  relad(): void;
};
export { LoginFormContiner };
