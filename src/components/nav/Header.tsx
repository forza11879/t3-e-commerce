import React, { useState } from "react";
import Link from "next/link";
import { Menu, Badge, Input } from "antd";
import type { MenuProps } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  ShoppingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Search from "@/components/forms/Search";

const items: MenuProps["items"] = [
  {
    label: <Link href="/">Home</Link>,
    key: "home",
    icon: <AppstoreOutlined />,
  },
  {
    label: <Link href="/shop">Shop</Link>,
    key: "shop",
    icon: <ShoppingOutlined />,
  },
  {
    label: (
      <Link href="/cart">
        <Badge offset={[9, 0]}>Cart</Badge>
      </Link>
    ),
    key: "cart",
    icon: <ShoppingCartOutlined />,
  },
  {
    label: (
      <div className="float-right">
        <Link href="/register">Register</Link>
      </div>
    ),
    key: "register",
    icon: <UserAddOutlined />,
  },
  {
    label: (
      <div className="float-right">
        <Link href="/login">Login</Link>
      </div>
    ),
    key: "login",
    icon: <UserOutlined />,
  },
  {
    label: <div className="float-right">Submenu</div>,
    key: "SubMenu",
    icon: <SettingOutlined />,
    children: [
      {
        label: <Link href="/register">Register</Link>,
        key: "registerr",
      },
      {
        label: <Link href="/admin/dashboard">Dashboard</Link>,
        key: "Dashboard",
      },
    ],
  },
  {
    label: <Link href="/api/auth/signout">Sign Out</Link>,
    key: "SignOut",
    icon: <LogoutOutlined />,
  },
  // {
  // label: (
  // <span className="float-right p-1">
  // <Search />
  // <Search
  //   placeholder="Search..."
  //   style={{ width: 200, marginRight: 24 }}
  //   prefix={<SearchOutlined />}
  // />
  // </span>
  // ),
  // key: "",
  // icon: <LogoutOutlined />,
  // },
];

const Header: React.FC = () => {
  const [current, setCurrent] = useState("home");

  const onClick: MenuProps["onClick"] = (e) => {
    // console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div className="flex items-center">
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        className="mr-4 flex-shrink-0"
      />
      <Search />
    </div>
  );
};

export default Header;
