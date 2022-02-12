import Link from "next/link";
import * as Yup from "yup";
import { withFormik, FormikProps, Form } from "formik";

import { InputField, Button, CheckBox } from "src/components";

// Shape of form values
interface FormValues {
  username: string;
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
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const InnerRegisterForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { isSubmitting, message } = props;
  return (
    <>
      <div className="actions-hr mb-20">
        <div className="actions-hr__label">
          <div className="form-header">{message}<Link href="/login" passHref><span>Login</span></Link></div>
        </div>
      </div>
      <Form>
        <InputField type="text" name="username" label="Username" />
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
          Register
        </Button>
      </Form>
    </>
  );
};

// The type of props MyForm receives
interface RegisterFormProps {
  initialEmail?: string;
  initialUsername?: string;
  message: string; // if this passed all the way through you might do this or make a union type
}

const RegisterForm = withFormik<RegisterFormProps, FormValues>({
  mapPropsToValues: (props) => {
    return {
      username: props.initialUsername || "",
      email: props.initialEmail || "",
      password: "",
    };
  },
  validationSchema: inputValidationSchema,

  handleSubmit: (values) => {
    // do submitting things
    console.log(values);
  },
})(InnerRegisterForm);

export default RegisterForm;
