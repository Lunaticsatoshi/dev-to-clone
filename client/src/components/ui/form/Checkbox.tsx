import { DetailedHTMLProps, InputHTMLAttributes, FC } from "react";
import { useField } from "formik";

import { classNames } from "src/utils";

export const Label = (props: JSX.IntrinsicElements["label"]) => {
  return (
    <label
      {...props}
      className={classNames(
        "block text-grey-darker text-sm",
        props.className,
      )}
    >
      {props.children}
    </label>
  );
};

type CheckBoxProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  labelProps?: React.ComponentProps<typeof Label>;
  name: string;
  textarea?: boolean;
};

const CheckBox: FC<CheckBoxProps> = ({
  label,
  textarea,
  labelProps,
  size: _,
  color: __,
  ref: ___,
  className,
  ...props
}) => {
  const [field] = useField(props);
  return (
    <div className="mb-2 flex items-center">
      <input
        id={field.name}
        className={classNames("mr-2 w-5", className)}
        {...field}
        {...props}
        type="checkbox"
      />
      {label && <Label {...labelProps}>{label}</Label>}
    </div>
  );
};

export default CheckBox;
