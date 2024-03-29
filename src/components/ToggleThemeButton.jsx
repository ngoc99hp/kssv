import React from "react";
import { Button } from "antd";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

const ToggleThemeButton = ({ darkTheme, toggleTheme }) => {
  return (
    <div className="absolute bottom-[30px] left-[20px] flex items-center justify-center text-base">
      <Button className="bg-white" onClick={toggleTheme}>
        {darkTheme ? <HiOutlineSun /> : <HiOutlineMoon />}
      </Button>
    </div>
  );
};

export default ToggleThemeButton;
