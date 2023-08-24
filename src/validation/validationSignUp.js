import { isValidEmail } from "./validators";

export default function validate(values, intl) {
  let errors = {};
  if (values.login != null && !isValidEmail(values.login)) {
    errors.login = intl.formatMessage({ id: "page.form.error.email" });
  }

  if (values.password != null) {
    /*
  /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[,.!@#$%^&*_-]).{5,}$/
  Пояснение:
  (?=.*[0-9]) - строка содержит хотя бы одно число;
  (?=.*[a-z]) - строка содержит хотя бы одну латинскую букву в нижнем регистре;
  (?=.*[A-Z]) - строка содержит хотя бы одну латинскую букву в верхнем регистре;
  (?=.*[,.!@#$%^&*_-]) - строка содержит хотя бы один символ 
  .{5,} - строка состоит не менее, чем из 5 вышеупомянутых символов.
  */

    const checkRules = {
      one_digit: /(?=.*[0-9])/,
      one_upper_letter: /(?=.*[A-Z])/,
      one_lowecase_laeer: /(?=.*[a-z])/,
      one_symbol: /(?=.*[,.!@#$%^&*_-])/,
      min_length: ".{5,}",
    };

    Object.keys(checkRules).forEach((key) => {
      const regex = new RegExp(checkRules[key]);
      errors = {
        ...errors,
        passRules: {
          ...errors?.passRules,
          [key]: {
            valid: regex.test(values.password),
            // ruleText: intl.formatMessage({ id: `page.reg.error.pass.${key}` }),
          },
        },
      };
    });

    if (
      Object.keys(errors?.passRules).filter(
        (key) => !errors?.passRules[key].valid
      ).length === 0
    ) {
      delete errors?.passRules;
    } else {
      errors.password = intl.formatMessage({ id: "page.reg.error.pass" });
    }
  }

  if (values.repassword != null && values.password !== values.repassword) {
    errors.repassword = intl.formatMessage({
      id: "page.reg.error.up_not_match_pass",
    });
  }

  if (values.name != null && !values.name) {
    errors.name = intl.formatMessage({
      id: "page.form.error.name",
    });
  }

  return errors;
}
