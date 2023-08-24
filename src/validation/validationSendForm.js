import { isValidEmail } from "./validators";

export default function validate(values, intl) {
  let errors = {};

  if (values.name != null && values.name.trim() === "") {
    errors.name = intl.formatMessage({ id: "page.form.error.name" });
  }
  if (values.email != null && !isValidEmail(values.email)) {
    errors.email = intl.formatMessage({ id: "page.form.error.email" });
  }
  if (values?.message != null && values.message.trim() === "") {
    errors.message = intl.formatMessage({ id: "page.form.error.message" });
  }

  // console.log("=== values ===", values);
  // console.log("=== errors ===", errors);
  return errors;
}
