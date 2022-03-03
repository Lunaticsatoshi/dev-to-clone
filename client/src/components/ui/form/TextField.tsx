import { DetailedHTMLProps, InputHTMLAttributes, FC } from "react";
import { useField } from "formik";

import { classNames } from "src/utils";

type InputTextFieldProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string;
  textarea?: boolean;
};

const InputTextField: FC<InputTextFieldProps> = ({
  textarea,
  size: _,
  color: __,
  ref: ___,
  className,
  ...props
}) => {
  const [field] = useField(props);
  return (
    <div>
      <input
        id={field.name}
        className={classNames(className)}
        {...field}
        {...props}
        type="textarea"
      />
    </div>
  );
};

export default InputTextField;
