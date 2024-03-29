import { useState } from "react";
import { Layout, Button, theme, Breadcrumb, } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import {
  Routes,
  Outlet,
  Route,
} from "react-router-dom";
import Logo from "./components/Logo";
import MenuList from "./components/MenuList";
// import "./App.css";
import ToggleThemeButton from "./components/ToggleThemeButton";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import ReceiveMoney from "./pages/payment/receiveMoney/ReceiveMoney";
import PayMoney from "./pages/payment/payMoney/PayMoney";





const { Header, Sider, Content } = Layout;

function DefaultLayout() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // console.log(colorBgContainer)

  return ( 
    <Layout className="min-h-screen">
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        theme={darkTheme ? "dark" : "light"}
        className="bg-white w-fit"
      >
        <Logo />
        <MenuList darkTheme={darkTheme} />
        <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
      </Sider>
      <Layout>
        <Header
          className="p-0"
          style={{
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            className="ml-[15px]"
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Tasks</Breadcrumb.Item>
            <Breadcrumb.Item>Task 1</Breadcrumb.Item>
          </Breadcrumb>
          {/* Content */}
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            className="min-h-[70vh]"
          >
            <Outlet/>
          </div>
        </Content>
      </Layout>
    </Layout>
   );
}




function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route
          index
          element={<Home />}
        />
        <Route path="users" element={<Users />} />
        <Route path="/receive-money" element={<ReceiveMoney/>} />
        <Route path="/pay-money" element={<PayMoney/>} />
      </Route>
    </Routes>
  );
}

export default App;
