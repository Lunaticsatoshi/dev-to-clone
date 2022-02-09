import { FC, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode | string | number;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  className,
  type,
  disabled,
}) => {
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
