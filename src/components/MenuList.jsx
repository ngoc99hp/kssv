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
    // {
    //   key: 'Quản lý danh mục',
    //   icon: <AreaChartOutlined />,
    //   label: 'Quản lý danh mục',
    //   onClick: () => navigate("/category")
    // },
    {
      key: 'Thông tin người thuê',
      icon: <AreaChartOutlined />,
      label: 'Thông tin người thuê',
      onClick: () => navigate("/progress")
    },
    {
      key: 'Phân phòng',
      icon: <AreaChartOutlined />,
      label: 'Phân phòng',
      onClick: () => navigate("/select-room")
    },
    {
      key: 'Thống kê',
      icon: <AreaChartOutlined />,
      label: 'Thống kê',
      onClick: () => navigate("/report")
    },
    {
      key: 'payment',
      icon: <PayCircleOutlined />,
      label: 'Payment',
      children: [
        {
          key: 'receive-money',
          icon: <GiReceiveMoney />,
          label: 'ReceiveMoney',
          onClick: () => navigate("/receive-money")
        },
        {
          key: 'pay-money',
          icon: <GiPayMoney />,
          label: 'PayMoney',
          onClick: () => navigate("/pay-money")
        }
      ]
    },
    {
      key: 'setting',
      icon: <SettingOutlined />,
      label: 'Setting',
      children: [
        {
          key : 'electricity_rates',
          icon: <GiElectric  />,
          label: 'Electricity rate',
          onClick: () => navigate("/setting/electricity-rates")
        },
        {
          key : 'water_rates',
          icon: <IoWaterSharp />,
          label: 'Water rate'
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




