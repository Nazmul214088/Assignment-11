import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
