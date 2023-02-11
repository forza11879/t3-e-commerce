import React, { useState } from "react";
import Link from "next/link";
// import firebase from "firebase";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Menu, Badge, Typography } from "antd";
import type { MenuProps } from "antd";

// import dynamic from 'next/dynamic';
// const { Badge } = dynamic(() => import('antd'), {
//   ssr: false,
// });
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  MailOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

// import { parseCookies, setCookie, destroyCookie } from "nookies";
// import { selectUser, getUserLoggedOut } from "@/store/user";
// import { selectCart } from "@/store/cart";
// // import Search from "@/components/forms/Search";
// import ColumnGroup from "antd/lib/table/ColumnGroup";
const session = true;

const items: MenuProps["items"] = [
  {
    label: <Link href="/">Home</Link>,
    key: "home",
    icon: <AppstoreOutlined />,
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
    label: Boolean(session) && <div className="float-right">Submenu</div>,
    key: "SubMenu",
    icon: <SettingOutlined />,
    children: [
      {
        label: <Link href="/user/history">Dashboard</Link>,
        key: "Dashboard",
      },
      {
        label: <Link href="/admin/dashboard">Dashboard</Link>,
        key: "Dashboard",
      },
      {
        label: (
          <Link href="/api/auth/signout">
            {/* onClick={(e) => {
                e.preventDefault();
                signOut();
                logout();
              }} */}
            Sign Out
          </Link>
        ),
        key: "SignOut",
        icon: <LogoutOutlined />,
      },
    ],
  },
];

const Header: React.FC = () => {
  const [current, setCurrent] = useState("home");
  // const { data: session, status } = useSession();

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  // console.log({ session, status });
  const router = useRouter();
  // console.log({ router });

  // const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  // const cart = useSelector(selectCart);

  // const MyBadge = React.forwardRef(({ onClick, href }, ref) => {
  //   return (
  //     <a href={href} onClick={onClick} ref={ref}>
  //       <Badge count={cart.length} offset={[9, 0]}>
  //         Cart
  //       </Badge>
  //     </a>
  //   );
  // });

  // const handleClick = (e) => {
  //   // console.log(e.key);
  //   setCurrent(e.key);
  // };

  // const logout = () => {
  //   firebase.auth().signOut();
  //   dispatch(getUserLoggedOut());
  // };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
