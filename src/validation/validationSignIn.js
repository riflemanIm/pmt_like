import { isValidEmail } from "./validators";

export default function validate(values) {
  let errors = {};

  if (values?.login != null && values.login.trim() === "") {
    //    if (values?.login != null && !isValidEmail(values.login)) {
    errors.login = "Введите Email";
  }

  if (values?.password != null && !values?.password.trim()) {
    errors.password = "Пароль";
  }
  // console.log("=== values ===", values);
  // console.log("=== errors ===", errors);
  return errors;
}
