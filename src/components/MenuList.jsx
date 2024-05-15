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
import { GiReceiveMoney, GiElectric } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import { IoWaterSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { RiWaterFlashLine } from "react-icons/ri";
import { FaMoneyBillWave } from "react-icons/fa6";
import { FaRegCircleUser } from "react-icons/fa6";

const MenuList = ({ darkTheme }) => {
  
  const navigate = useNavigate();

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Home',
      onClick: () => navigate("/")
    },
    {
      key: 'activity',
      icon: <AppstoreOutlined />,
      label: 'Activity'
    },
    {
      key: 'tasks',
      icon: <BarsOutlined />,
      label: 'Tasks',
      children: [
        { key: 'task-1', label: 'Task 1' },
        { key: 'task-2', label: 'Task 2' },
        { key: 'task-3', label: 'Task 3' },
        {
          key: 'subtasks',
          label: 'Subtasks',
          children: [
            { key: 'subtask-1', label: 'Task 1' },
            { key: 'subtask-2', label: 'Task 2' }
          ]
        }
      ]
    },
    {
      key: 'progress',
      icon: <AreaChartOutlined />,
      label: 'Progress'
    },
    {
      key: 'payment',
      icon: <PayCircleOutlined />,
      label: 'Tài chính',
      children: [
        {
          key : 'num-water-electric',
          icon: <RiWaterFlashLine />,
          label: 'Chỉ số điện, nước',
          onClick: () => navigate("/num-water-electric")
        },
        {
          key : 'month-bills',
          icon: <FaMoneyBillWave />,
          label: 'Hoá đơn hàng tháng',
          onClick: () => navigate("/month-bills")
        }
      ]
    },
    {
      key: 'setting',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
      children: [
        {
          key : 'insert_user',
          icon: <FaRegCircleUser />,
          label: 'Tạo tài khoản',
          onClick: () => navigate("/setting/insert-user")
        },
        {
          key : 'electricity_rates',
          icon: <GiElectric  />,
          label: 'Đơn giá điện',
          onClick: () => navigate("/setting/electricity-rates")
        },
        {
          key : 'water_rates',
          icon: <IoWaterSharp />,
          label: 'Đơn giá nước',
          onClick: () => navigate("/setting/water-rates")
        },
      ]
    }
  ];

  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      mode="inline"
      className="mt-[8px] flex flex-col gap-4 text-base relative select-none"
      items={menuItems}
    />
  );
};

export default MenuList;




