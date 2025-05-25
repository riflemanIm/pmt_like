import {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import isEmpty from "../helpers";

/**
 * A custom hook for managing form state and validation.
 * @param callback Function to call after successful validation
 * @param validate Function that receives current values and returns an errors object
 */
function useForm<Values extends Record<string, any>>(
  callback: () => void,
  validate: (values: Values) => Partial<Record<keyof Values, string>>
): {
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleSubmit: () => void;
  values: Values;
  errors: Partial<Record<keyof Values, string>>;
  setValues: Dispatch<SetStateAction<Values>>;
  setErrors: Dispatch<SetStateAction<Partial<Record<keyof Values, string>>>>;
} {
  const [values, setValues] = useState<Values>({} as Values);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEmpty(errors) && isSubmitting) {
      callback();
      setIsSubmitting(false);
    }
  }, [errors, isSubmitting, callback]);

  const handleSubmit = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setIsSubmitting(true);
  };

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    const updatedValues = {
      ...values,
      [name]: value,
    } as Values;
    setValues(updatedValues);

    if (!isEmpty(validate)) {
      const validationErrors = validate(updatedValues);
      setErrors(validationErrors);
    }
  };

  return { handleChange, handleSubmit, values, errors, setValues, setErrors };
}

export default useForm;
