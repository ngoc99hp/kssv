import React from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  BarsOutlined,
  AreaChartOutlined,
  PayCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const MenuList = ({ darkTheme }) => {
  
  const navigate = useNavigate();

  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      mode="inline"
      className="h-[88vh] mt-[8px] flex flex-col gap-4 text-base relative"
    >
      <Menu.Item
        key="home"
        icon={<HomeOutlined />}
        onClick={() => navigate("/home")}
      >
        Home
      </Menu.Item>
      <Menu.Item key="activity" icon={<AppstoreOutlined />}>
        Activity
      </Menu.Item>
      <Menu.SubMenu key="tasks" icon={<BarsOutlined />} title="Tasks">
        <Menu.Item key="task-1">Task 1</Menu.Item>
        <Menu.Item key="task-2">Task 2</Menu.Item>
        <Menu.Item key="task-3">Task 3</Menu.Item>
        <Menu.SubMenu key="subtasks" title="Subtasks">
          <Menu.Item key="subtask-1">Task 1</Menu.Item>
          <Menu.Item key="subtask-2">Task 2</Menu.Item>
        </Menu.SubMenu>
      </Menu.SubMenu>
      <Menu.Item key="progress" icon={<AreaChartOutlined />}>
        Progress
      </Menu.Item>
      <Menu.SubMenu key="payment" icon={<PayCircleOutlined />} title="Payment">
        <Menu.Item key="receive-money" icon={<GiReceiveMoney />} onClick={() => navigate("/receive-money")}>
          ReceiveMoney
        </Menu.Item>
        <Menu.Item key="pay-money" icon={<GiPayMoney />} onClick={() => navigate("/pay-money")}>
          PayMoney
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="setting" icon={<SettingOutlined />}>
        Setting
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
