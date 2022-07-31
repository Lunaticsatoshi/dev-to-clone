import { FC } from "react";
import Link from "next/link";
import * as Yup from "yup";
import { Form, useFormik, FormikProvider } from "formik";
import { useMutation } from "@tanstack/react-query";

import { InputField, Button, CheckBox } from "src/components";
import { useAuthState } from "src/hooks";
import { userLogin } from "src/lib/api";

interface InnerLoginFormProps {
  message: string;
  handleSubmit: () => void;
  isSubmitting: boolean;
}

const inputValidationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const InnerLoginForm = (props: InnerLoginFormProps) => {
  const { message, handleSubmit, isSubmitting } = props;
  return (
    <>
      <div className="actions-hr mb-20">
        <div className="actions-hr__label">
          <div className="form-header">{message}</div>
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <InputField type="email" name="email" label="Email" />

        <InputField
          name="password"
          placeholder="*******"
          label="Password"
          type="password"
        />

        <CheckBox name="remember" label="Remember me" />

        <Button
          type="submit"
          className="w-full btn auth-btn font-bold rounded-full focus:outline-none focus:shadow-outline"
          disabled={isSubmitting}
        >
          Login
        </Button>
      </Form>
      <div className="pt-6 mt-20 text-center">
        <Link href="/">
          <a>I forgot my passed</a>
        </Link>
      </div>
    </>
  );
};

// The type of props LoginForm receives
interface LoginFormProps {
  initialEmail?: string;
  message: string;
}

const LoginForm: FC<LoginFormProps> = ({ initialEmail, message }) => {
  const { login } = useAuthState();
  const { mutateAsync } = useMutation(userLogin, {
    onSuccess: ({ data }) => login(data),
  });
  const formik = useFormik({
    initialValues: {
      email: initialEmail || "",
      password: "",
    },
    validationSchema: inputValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      await mutateAsync({ ...values });
      resetForm();
    },
  });
  const { handleSubmit, isSubmitting } = formik;
  return (
    <div>
      <FormikProvider value={formik}>
        <InnerLoginForm
          message={message}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </FormikProvider>
    </div>
  );
};

export default LoginForm;
