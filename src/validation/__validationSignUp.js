import { isValidEmail } from "./validators";

export default function validate(values) {
  let errors = {};
  if (values.email != null && !isValidEmail(values.email)) {
    errors.email = "Введите Email";
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
      ONE_DIGIT: /(?=.*[0-9])/,
      ONE_UPPER_LETTER: /(?=.*[A-Z])/,
      ONE_LOWECASE_LAEER: /(?=.*[a-z])/,
      ONE_SYMBOL: /(?=.*[,.!@#$%^&*_-])/,
      MIN_LENGTH: ".{5,}",
    };

    const errorText = {
      ONE_DIGIT: "хотя бы одно число",
      ONE_UPPER_LETTER: "хотя бы одна латинская буква в верхнем регистре",
      ONE_LOWECASE_LAEER: "хотя бы одна латинская буква в нижнем регистре",
      ONE_SYMBOL: "хотя бы один специальный символ",
      MIN_LENGTH: "не менее, чем  5 вышеупомянутых символов",
      CONFIRM_CODE_WRONG: "Неправильный код подтверждения",
    };

    Object.keys(checkRules).forEach((key) => {
      const regex = new RegExp(checkRules[key]);
      errors = {
        ...errors,
        passRules: {
          ...errors?.passRules,
          [key]: {
            valid: regex.test(values.password),
            ruleText: errorText[key],
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
      errors.password =
        "Пароль должен содержать: хотя бы одно число, хотя бы одну латинскую букву в нижнем и верхнем регистре, хотя бы один специальный символ и должен быть не менее, чем из 5 символов";
    }
  }

  if (values.repassword != null && values.password !== values.repassword) {
    errors.repassword = "Пароли не совпадают";
  }

  if (values.name != null && !values.name) {
    errors.name = "Введите имя";
  }

  if (!values.phone) {
    errors.phone = "Введите телефон";
  }
  if (values.company != null && !values.company) {
    errors.company = "Введите место работы";
  }
  if (values.town != null && !values.town) {
    errors.town = "Введите город";
  }
  if (values.address != null && !values.address) {
    errors.address = "Введите адрес";
  }

  return errors;
}
