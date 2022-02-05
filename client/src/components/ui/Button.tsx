import { FC, ReactNode } from "react";

type ButtonProps = {
    children: ReactNode | string | number;
    onClick?: () => void;
    className?: string;
};

const Button: FC<ButtonProps> = ({ children, onClick, className }) => {
  return <button className={className} onClick={onClick}>{children}</button>;
};

export default Button;
