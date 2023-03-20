import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import Link from "next/link";
import { Menu, Badge, Button } from "antd";
import type { MenuProps } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  ShoppingOutlined,
  UserAddOutlined,
  LogoutOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Search from "@/components/forms/Search";

const Header: React.FC = () => {
  const [current, setCurrent] = useState("home");
  const { data: session, status } = useSession();
  const router = useRouter();

  const authenticated = status === "authenticated";
  const email = session?.user.email || null;

  const clickEventHandler = async () => {
    await router.push(`/auth/signin`);
    await signOut();
  };


  const clickHandler = () => {
    return void clickEventHandler();
  };

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
      label: authenticated ? email?.split('@')[0] :
        <Link href="/auth/signin">Log in</Link>,
      key: "SubMenu",
      icon: authenticated ? <SettingOutlined /> : <LoginOutlined />,
      children: authenticated ? [
        {
          label: <Link href="/register">Register</Link>,
          key: "registerr",
        },
        {
          label: <Link href="/admin/dashboard">Dashboard</Link>,
          key: "Dashboard",
        },
        {
          label: <Button type="text" onClick={clickHandler}>
            Sign Out
          </Button>
          ,
          key: "SignOut",
          icon: <LogoutOutlined />,
        },

      ] : [],
    },

  ];

  const onClick: MenuProps["onClick"] = (e) => {
    // console.log("click ", e);
    setCurrent(e.key);
  };

  return (

    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      className="flex w-full items-center"
    />
  );
};

export default Header;

// return (
//   <div className="flex w-full items-center">
//     <Menu
//       onClick={onClick}
//       selectedKeys={[current]}
//       mode="horizontal"
//       items={items}
//       className="flex w-full items-center"
//       // className="mr-4 flex-shrink-0"
//     />
//     {/* <Search /> */}
//   </div>
// );
