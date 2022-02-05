import { FC } from "react";
import { useTheme } from "next-themes";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";

type ToggleProps = {
  className?: string;
};

const ThemeToggle: FC<ToggleProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      {theme === "dark" ? (
        <div className={className} onClick={() => setTheme("light")}>
          <BsSunFill />
        </div>
      ) : (
        <div className={className} onClick={() => setTheme("dark")}>
          <BsMoonStarsFill />
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
