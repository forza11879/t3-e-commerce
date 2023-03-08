import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import Link from "next/link";
import { Menu, Badge } from "antd";
import type { MenuProps } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  ShoppingOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Search from "@/components/forms/Search";

// const items = (status: string): MenuProps["items"] => [

const Header: React.FC = () => {
  const [current, setCurrent] = useState("home");
  const { data, status } = useSession();

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
      label: (
        <div className="float-right">
          <Link href="/auth/signin">Log in</Link>
        </div>
      ),
      key: "register",
      icon: <UserAddOutlined />,
    },
    // {
    //   label:
    //     status === "authenticated" ? (
    //       <div className="float-right">
    //         <Link href="/api/auth/signout">Sign Out</Link>
    //       </div>
    //     ) : (
    //       <div className="float-right">
    //         <Link href="/login">Login</Link>
    //       </div>
    //     ),
    //   key: "SignOutt",
    //   icon: <LogoutOutlined />,
    // },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    // console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div className="flex w-full items-center">
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        // className="mr-4 flex-shrink-0"
      />
      {/* <Search /> */}
    </div>
  );
};

export default Header;
