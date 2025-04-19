import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Button } from "./Buttons";
import { InputField } from "./forms/InputField";

const UserPasswordExpired = () => {
  const { activeUser } = useAuth();
  const [type, setType] = useState("password");
  const handleType = () => {
    type === "text" ? setType("password") : setType("text");
  };
  return (
    <div className="flex items-center justify-center w-full h-full flex-col">
      <div className="flex flex-row bg-red-400 shadow-lg w-4/5 mb-2 text-white rounded p-2 lg:w-1/4 items-center ">
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
          <span> Su contraseña ha caducado.</span>
          <span>
            Para continuar usando los servicios de la universidad debe cambiar
            su contraseña.
          </span>
        </div>
      </div>
      <div className="border-2 p-4 border-secondary rounded-lg w-4/5 lg:w-1/4">
        <Formik initialValues={{}} onSubmit={() => {}} enableReinitialize>
          <Form>
            <div className=" flex w-full items-center">
              <InputField
                field="password"
                label="Contraseña actual"
                type={type}
                className="w-full"
              />
              <FontAwesomeIcon
                icon={type === "text" ? faEyeSlash : faEye}
                onClick={handleType}
                className="-ml-8 z-10 mt-4 cursor-pointer"
              />
            </div>
            <div className=" flex w-full items-center">
              <InputField
                field="password"
                label="Contraseña nueva"
                type={type}
                className="w-full"
              />
              <FontAwesomeIcon
                icon={type === "text" ? faEyeSlash : faEye}
                onClick={handleType}
                className="-ml-8 z-10 mt-4 cursor-pointer"
              />
            </div>
            {activeUser?.activeUser?.User?.security_code ? (
              <InputField
                field="securityCode"
                label="Segundo Factor"
                mask="999999"
              />
            ) : null}

            <div className="mt-4 w-full flex justify-end">
              <Button
                label="Accept"
                className="button-primary w-full"
                // loading={isLoading}
                // disabled={isLoading || emailExists || hasEmailChanged || !isEmailValid || isInviting}
                // onClick={handleSubmitInvitation}
              />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export { UserPasswordExpired };
