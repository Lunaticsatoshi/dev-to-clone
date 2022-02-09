import { DetailedHTMLProps, InputHTMLAttributes, FC } from "react";
import { useField } from "formik";

import { classNames } from "src/lib";

export const Label = (props: JSX.IntrinsicElements["label"]) => {
  return (
    <label
      {...props}
      className={classNames(
        "block text-grey-darker text-sm font-bold mb-2",
        props.className,
      )}
    >
      {props.children}
    </label>
  );
};
export const InputLeading = (props: JSX.IntrinsicElements["div"]) => {
  return (
    <span className="inline-flex items-center flex-shrink-0 px-3 text-gray-500 border border-r-0 border-gray-300 rounded-l-sm bg-gray-50 sm:text-sm">
      {props.children}
    </span>
  );
};

type InputFieldProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  labelProps?: React.ComponentProps<typeof Label>;
  name: string;
  textarea?: boolean;
};

const InputField: FC<InputFieldProps> = ({
  label,
  textarea,
  labelProps,
  size: _,
  color: __,
  ref: ___,
  className,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <div className="mb-2">
      {label && <Label {...labelProps}>{label}</Label>}
      <input
        id={field.name}
        className={classNames(
          error
            ? "appearance-none border border-red rounded-md w-full py-2 px-3 text-grey-darker"
            : "appearance-none border rounded-md w-full py-2 px-3 text-grey-darker",
          className,
        )}
        {...field}
        {...props}
      />
      {error && <div className="text-red-500 text-xs italic mt-2">{error}</div>}
    </div>
  );
};

export default InputField;
