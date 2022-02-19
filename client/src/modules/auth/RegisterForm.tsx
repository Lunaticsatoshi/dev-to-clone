import { FC } from "react";
import Link from "next/link";
import * as Yup from "yup";
import { Form, useFormik, FormikProvider } from "formik";

import { InputField, Button } from "src/components";
import { useAuthState } from "src/hooks";

interface InnerRegisterFormProps {
  message: string;
  handleSubmit: () => void;
  isSubmitting: boolean;
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

const InnerRegisterForm = (props: InnerRegisterFormProps) => {
  const { message, handleSubmit, isSubmitting } = props;
  return (
    <>
      <div className="actions-hr mb-20">
        <div className="actions-hr__label">
          <div className="form-header">
            {message}
            <Link href="/login" passHref>
              <span>Login.</span>
            </Link>
          </div>
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <InputField type="text" name="username" label="Username" />
        <InputField type="email" name="email" label="Email" />

        <InputField
          name="password"
          placeholder="*******"
          label="Password"
          type="password"
        />

        <Button
          type="submit"
          className="w-full btn auth-btn font-bold rounded-full focus:outline-none focus:shadow-outline"
          disabled={isSubmitting}
        >
          Register
        </Button>
      </Form>
    </>
  );
};

// The type of props RegisterForm receives
interface RegisterFormProps {
  initialEmail?: string;
  message: string;
}

const RegisterForm: FC<RegisterFormProps> = ({ initialEmail, message }) => {
  const { register } = useAuthState();
  const formik = useFormik({
    initialValues: {
      username: initialEmail || "",
      email: initialEmail || "",
      password: "",
    },
    validationSchema: inputValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      await register(values.username, values.email, values.password);
      resetForm();
    },
  });
  const { handleSubmit, isSubmitting } = formik;
  return (
    <div>
      <FormikProvider value={formik}>
        <InnerRegisterForm
          message={message}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </FormikProvider>
    </div>
  );
};

export default RegisterForm;
