import Link from "next/link";
import * as Yup from "yup";
import { withFormik, FormikProps, Form } from "formik";

import { InputField, Button, CheckBox } from "src/components";

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

const InnerLoginForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { isSubmitting, message } = props;
  return (
    <>
      <div className="actions-hr mb-20">
        <div className="actions-hr__label">
          <div className="form-header">{message}</div>
        </div>
      </div>
      <Form>
        <InputField type="email" name="email" label="Email" />

        <InputField
          name="password"
          placeholder="*******"
          label="Password"
          type="password"
        />

        <CheckBox name="label" label="Remember me" />

        <Button
          type="submit"
          className="w-full btn login-btn font-bold rounded-full focus:outline-none focus:shadow-outline"
          disabled={isSubmitting}
        >
          Login
        </Button>
      </Form>
      <div className="pt-6 mt-20 text-center">
        <Link href="/"><a>I forgot my passed</a></Link>
      </div>
    </>
  );
};

// The type of props MyForm receives
interface LoginFormProps {
  initialEmail?: string;
  message: string; // if this passed all the way through you might do this or make a union type
}

const LoginForm = withFormik<LoginFormProps, FormValues>({
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
})(InnerLoginForm);

export default LoginForm;
