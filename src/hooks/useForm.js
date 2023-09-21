import { useState, useEffect } from "react";
import isEmpty from "../helpers";

const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEmpty(errors) && isSubmitting && callback != null) {
      callback();
      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  const handleSubmit = () => {
    //if (event) event.preventDefault();
    if (callback != null && validate != null) setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = (event) => {
    //console.log("event.target.value", event);
    //event.persist();

    const vals = {
      ...values,
      [event.target.name]: event.target.value,
    };

    setValues(vals);
    if (
      callback != null &&
      validate != null &&
      event.target.value != null &&
      values[event.target.name] !== event.target.value
    ) {
      // console.log(
      //   "== event.target.value ===",
      //   event.target.value,
      //   "values[event.target.name]",
      //   values[event.target.name],
      //   "validate",
      //   validate
      // );

      setErrors(validate(vals));
    }
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    setValues,
    setErrors,
  };
};

export default useForm;
