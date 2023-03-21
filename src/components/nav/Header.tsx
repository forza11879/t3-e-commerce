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
  const unauthenticated = status === "unauthenticated";
  const signinWindow = typeof window !== "undefined" && window?.location.href === 'http://localhost:3000/auth/signin'

  const email = session?.user.email || null;

  const clickEventHandler = async () => {
    // await router.push(`/auth/signin`);
    await signOut();
  };




  const clickHandler = () => {
    return void clickEventHandler();
  };

  const clickEventHandlerPush = async (unauthenticated: boolean, signinWindow: boolean) => {
    console.log({ unauthenticated });
    try {

      if (unauthenticated && !Boolean(signinWindow))
        await router.push(`/auth/signin`);

    } catch (error) {
      console.log({ error });
    }
  }

  const items: MenuProps["items"] = [
    {
      label: authenticated ? <Link href="/">Home</Link> : void clickEventHandlerPush(unauthenticated, signinWindow),
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
        signinWindow ? null : <Link href="/auth/signin">Log in</Link>,
      key: "SubMenu",
      icon: authenticated ? <SettingOutlined /> : signinWindow ? null : <LoginOutlined />,
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
