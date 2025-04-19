import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

const INITIAL_VALUES = {
  pass: "",
  // confirmPass: "",
};

const changePasswordSchema = Yup.object().shape({
  pass: Yup.string()
    .required("Campo obligatorio")
    .min(8, "Debe tener almenos 8 caracteres")
    .minLowercase(1, "Almenos 1 caracter en minuscula")
    .minUppercase(1, "Almenos 1 caracter en mayuscula")
    .minNumbers(1, "Almenos 1 numero"),
  // confirmPass: Yup.string()
  //   .oneOf([Yup.ref("pass")], "Las contraseñas deben coincidir")
  //   .required("Campo obligatotio"),
});

export { INITIAL_VALUES, changePasswordSchema };
