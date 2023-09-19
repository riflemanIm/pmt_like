export default function validate(values) {
  let errors = {};

  if (values?.login != null && values.login.trim() === "") {
    errors.login = "Введите Логин";
  }

  if (values?.password != null && !values?.password.trim()) {
    errors.password = "Введите Пароль";
  }
  if (values?.code != null && !values?.code.trim()) {
    errors.code = "Введите Код продукта";
  }

  // console.log("=== values ===", values);
  // console.log("=== errors ===", errors);
  return errors;
}
