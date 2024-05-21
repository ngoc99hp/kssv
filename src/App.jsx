import { ClerkProvider } from "@clerk/clerk-react";
// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
import {
  BrowserRouter,
  Routes,
  Outlet,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";
import { Layout, Button, theme, Breadcrumb } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

// import "./App.css";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignOutButton,
  RedirectToSignIn,
} from "@clerk/clerk-react";

//Sign In
import SignInPage from "./hardcomponents/signIn/SignInPage";

//Pages

import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import ElectricityRates from "./pages/setting/electricity_rates/ElectricityRates";
import WaterRates from "./pages/setting/water_rates/WaterRates";
import NumWaterElectric from "./pages/payment/num_water_electric/NumWaterElectric";
import MonthBills from "./pages/payment/month_bill/MonthBills";
import InsertUser from "./pages/setting/insert_user/InsertUser";
import Role from "./pages/setting/role/Role";
import Progress from "./pages/progress/progress";
//Component
import ToggleThemeButton from "./components/ToggleThemeButton";
import Logo from "./components/Logo";
import MenuList from "./components/MenuList";
import BreadCrumb from "./components/BreadCrumb";

const { Header, Sider, Content } = Layout;

function DefaultLayout() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(true);
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // console.log(colorBgContainer)

  return (
    <Layout hasSider className="min-h-screen w-full">
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        theme={darkTheme ? "dark" : "light"}
        className="bg-white h-screen overflow-y-auto"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0,
        }}
        width={250}
      >
        <Logo />
        <MenuList darkTheme={darkTheme} />
        <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
      </Sider>
      <Layout className="relative h-full">
        <Header
          className="p-0 flex items-center justify-between z-10"
          style={{
            background: colorBgContainer,
            position: "sticky",
            top: 0,
            right: 0,
          }}
        >
          <Button
            type="text"
            className="ml-[15px]"
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
          <div className="m-[20px]">
            <SignOutButton>
              <button>Đăng xuất</button>
            </SignOutButton>
          </div>
        </Header>

        <Content
          style={{
            margin: "0 16px",
          }}
          className="overscroll-y-auto relative"
        >
          <BreadCrumb />

          {/* ======== Content ========== */}
          <div
            style={{
              zIndex: 10,
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            className="min-h-[810px]"
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <SignedIn>
          <Routes>
            <Route path="/" element={<DefaultLayout />}>
              <Route index element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route
                path="/setting/electricity-rates"
                element={<ElectricityRates />}
              />
              <Route path="/progress" element={<Progress />} />
              <Route path="/setting/water-rates" element={<WaterRates />} />
              <Route
                path="/num-water-electric"
                element={<NumWaterElectric />}
              />
              <Route path="/month-bills" element={<MonthBills />} />
              <Route path="/setting/insert-user" element={<InsertUser />} />
              <Route path="/setting/role" element={<Role />} />
            </Route>
            <Route path="/sign-in" element={<SignInPage />} />
          </Routes>
        </SignedIn>
        <SignedOut>
          {/* <RedirectToSignIn /> */}
          <SignInPage />
        </SignedOut>
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;
