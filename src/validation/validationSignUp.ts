import { isValidEmail } from "./validators";

/**
 * Keys for individual password rules
 */
export type PassRuleKey =
  | "ONE_DIGIT"
  | "ONE_UPPER_LETTER"
  | "ONE_LOWERCASE_LETTER"
  | "ONE_SYMBOL"
  | "MIN_LENGTH";

/**
 * State for each password rule
 */
export interface PassRuleState {
  valid: boolean;
  ruleText: string;
}

/**
 * Shape of form values for signup/validation
 */
export interface ValidateValues {
  email?: string;
  password?: string;
  repassword?: string;
  name?: string;
  phone?: string;
  company?: string;
  town?: string;
  address?: string;
}

/**
 * Shape of validation errors returned by validate()
 */
export interface ValidateErrors {
  email?: string;
  password?: string;
  repassword?: string;
  name?: string;
  phone?: string;
  company?: string;
  town?: string;
  address?: string;
  passRules?: Partial<Record<PassRuleKey, PassRuleState>>;
}

/**
 * Validates form values and returns an object of errors.
 */
export default function validate(values: ValidateValues): ValidateErrors {
  const errors: ValidateErrors = {};

  // Email validation
  if (values.email != null && !isValidEmail(values.email)) {
    errors.email = "Введите корректный Email";
  }

  // Password rules
  if (values.password != null) {
    const rules: Record<PassRuleKey, RegExp> = {
      ONE_DIGIT: /(?=.*[0-9])/, // хотя бы одна цифра
      ONE_UPPER_LETTER: /(?=.*[A-Z])/, // хотя бы одна заглавная буква
      ONE_LOWERCASE_LETTER: /(?=.*[a-z])/, // хотя бы одна строчная буква
      ONE_SYMBOL: /(?=.*[,.!@#$%^&*_-])/, // хотя бы один специальный символ
      MIN_LENGTH: /.{5,}/, // минимум 5 символов
    };

    const ruleText: Record<PassRuleKey, string> = {
      ONE_DIGIT: "хотя бы одно число",
      ONE_UPPER_LETTER: "хотя бы одна латинская буква в верхнем регистре",
      ONE_LOWERCASE_LETTER: "хотя бы одна латинская буква в нижнем регистре",
      ONE_SYMBOL: "хотя бы один специальный символ",
      MIN_LENGTH: "не менее чем из 5 символов",
    };

    // Evaluate each rule
    const passRules: Partial<Record<PassRuleKey, PassRuleState>> = {};
    (Object.keys(rules) as PassRuleKey[]).forEach((key) => {
      const regex = rules[key];
      const valid = regex.test(values.password!);
      passRules[key] = { valid, ruleText: ruleText[key] };
    });

    // If any rule fails, set general password error
    const failed = Object.values(passRules).some((r) => !r.valid);
    if (failed) {
      errors.password =
        "Пароль должен содержать: " +
        (Object.values(passRules)
          .filter((r) => !r.valid)
          .map((r) => r.ruleText)
          .join(", ") +
          ".");
      errors.passRules = passRules;
    }
  }

  // Confirm password
  if (values.repassword != null && values.password !== values.repassword) {
    errors.repassword = "Пароли не совпадают";
  }

  // Name
  if (values.name != null && !values.name.trim()) {
    errors.name = "Введите имя";
  }

  // Phone
  if (!values.phone) {
    errors.phone = "Введите телефон";
  }

  // Company
  if (values.company != null && !values.company.trim()) {
    errors.company = "Введите место работы";
  }

  // Town
  if (values.town != null && !values.town.trim()) {
    errors.town = "Введите город";
  }

  // Address
  if (values.address != null && !values.address.trim()) {
    errors.address = "Введите адрес";
  }

  return errors;
}
