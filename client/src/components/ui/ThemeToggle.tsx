import { FC } from "react";
import { useTheme } from "next-themes";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";

type ToggleProps = {
  className?: string;
};

const ThemeToggle: FC<ToggleProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  if (theme === "light") {
    return (
      <div className={className} onClick={() => setTheme("dark")}>
        <BsMoonStarsFill />
      </div>
    );
  } else {
    return (
      <div className={className} onClick={() => setTheme("light")}>
        <BsSunFill />
      </div>
    );
  }
};

export default ThemeToggle;
