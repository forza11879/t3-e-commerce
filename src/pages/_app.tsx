import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { env } from "../env.mjs";
import { ToastContainer } from 'react-toastify';
// import nProgress from 'nprogress';
import 'react-toastify/dist/ReactToastify.css';


import { api } from "../utils/api";
import Header from "@/components/nav/Header";
import "antd/dist/reset.css";
import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  // console.log("EMAIL_SERVER_PORT:", typeof process.env.EMAIL_SERVER_PORT);

  return (
    <SessionProvider session={session}>
      <ReactQueryDevtools initialIsOpen={true} />
      <Header />
      <ToastContainer />
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
