import * as Yup from "yup";
import { withFormik, FormikProps, Form } from "formik";

import { InputField, Button } from "src/components";

// Shape of form values
interface FormValues {
  email: string;
  password: string;
}

interface OtherProps {
  message: string;
}

const inputValidationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { isSubmitting, message } = props;
  return (
    <Form>
      <h1>{message}</h1>
      <InputField
        type="email"
        name="email"
        label="Email"
        // className="border-rounded w-full py-2 px-4 outline-none leading-tight text-gray-700 shadow appearance-none focus:outline-none focus:shadow-outline"
      />

      <InputField
        name="password"
        placeholder="*******"
        label="Password"
        type="password"
        // className="border-rounded w-full py-2 px-4 outline-none leading-tight text-gray-700 shadow appearance-none focus:outline-none focus:shadow-outline"
      />

      <Button
        type="submit"
        className="w-full btn px-4 py-2 my-2 font-bold rounded-full focus:outline-none focus:shadow-outline"
        disabled={isSubmitting}
      >
        Login
      </Button>
    </Form>
  );
};

// The type of props MyForm receives
interface MyFormProps {
  initialEmail?: string;
  message: string; // if this passed all the way through you might do this or make a union type
}

const LoginForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props) => {
    return {
      email: props.initialEmail || "",
      password: "",
    };
  },
  validationSchema: inputValidationSchema,

  handleSubmit: (values) => {
    // do submitting things
    console.log(values);
  },
})(InnerForm);

export default LoginForm;
