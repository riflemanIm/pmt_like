//import { isValidEmail } from "./validators";

export default function validate(values, intl) {
  let errors = {};
  if (values.bilet == null) {
    errors.bilet = intl.formatMessage({ id: "page.form.error.biletik" });
  }
  // console.log("=== values ===", values);
  // console.log("=== errors ===", errors);
  return errors;
}
