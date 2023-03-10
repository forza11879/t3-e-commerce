import type { GetServerSidePropsContext } from "next";
import { z } from 'zod';
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
  type DefaultUser,
  type User
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { createTransport } from "nodemailer";

import { env } from "../env.mjs";
import { prisma } from "./db";
import type { UserWithRelations } from '../../prisma/generated/zod/modelSchema/UserSchema'
// import type { User } from "@prisma/client";

import type { RouterOutputs } from "../../src/utils/api"

// type UserOutput = RouterOutputs['example']['getAllUsers']

interface Profile {
  sub: string;
  name: string;
  picture: string;
  email: string;
}

interface HtmlProps {
  base_url: string;
  signin_url: string;
  email: string;
}

// interface User {
//   user: UserWithRelations;
// }

const transporter = createTransport({
  host: env.EMAIL_SERVER_HOST,
  port: 465,
  auth: {
    user: env.EMAIL_SERVER_USER,
    pass: env.EMAIL_SERVER_PASSWORD,
  },
  secure: true,
});




const html = (params: HtmlProps) => {
  const { base_url, signin_url, email } = params

  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title></title>
    <style type="text/css" rel="stylesheet" media="all">
      /* Base ------------------------------ */

      @import url('https://fonts.googleapis.com/css?family=Inter:400,700&display=swap');
      body {
        width: 100% !important;
        height: 100%;
        margin: 0;
        -webkit-text-size-adjust: none;
      }

      a {
        color: #3b82f6;
      }

      a img {
        border: none;
      }

      td {
        word-break: break-word;
      }

      .preheader {
        display: none !important;
        visibility: hidden;
        mso-hide: all;
        font-size: 1px;
        line-height: 1px;
        max-height: 0;
        max-width: 0;
        opacity: 0;
        overflow: hidden;
      }
      /* Type ------------------------------ */

      body,
      td,
      th {
        font-family: 'Inter', Helvetica, Arial, sans-serif;
      }

      h1 {
        margin-top: 0;
        color: #333333;
        font-size: 22px;
        font-weight: bold;
        text-align: left;
      }

      h2 {
        margin-top: 0;
        color: #333333;
        font-size: 16px;
        font-weight: bold;
        text-align: left;
      }

      h3 {
        margin-top: 0;
        color: #333333;
        font-size: 14px;
        font-weight: bold;
        text-align: left;
      }

      td,
      th {
        font-size: 16px;
      }

      p,
      ul,
      ol,
      blockquote {
        margin: 0.4em 0 1.1875em;
        font-size: 16px;
        line-height: 1.625;
      }

      p.sub {
        font-size: 13px;
      }
      /* Utilities ------------------------------ */

      .align-right {
        text-align: right;
      }

      .align-left {
        text-align: left;
      }

      .align-center {
        text-align: center;
      }
      /* Buttons ------------------------------ */

      .button {
        background-color: #3b82f6;
        border-top: 10px solid #3b82f6;
        border-right: 18px solid #3b82f6;
        border-bottom: 10px solid #3b82f6;
        border-left: 18px solid #3b82f6;
        display: inline-block;
        color: #fff !important;
        text-decoration: none;
        border-radius: 0.375rem;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
        -webkit-text-size-adjust: none;
        box-sizing: border-box;
      }

      @media only screen and (max-width: 500px) {
        .button {
          width: 100% !important;
          text-align: center !important;
        }
      }
      /* Attribute list ------------------------------ */

      .attributes {
        margin: 0 0 21px;
      }

      .attributes_content {
        background-color: #f4f4f7;
        padding: 16px;
      }

      .attributes_item {
        padding: 0;
      }
      /* Related Items ------------------------------ */

      .related {
        width: 100%;
        margin: 0;
        padding: 25px 0 0 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
      }

      .related_item {
        padding: 10px 0;
        color: #cbcccf;
        font-size: 15px;
        line-height: 18px;
      }

      .related_item-title {
        display: block;
        margin: 0.5em 0 0;
      }

      .related_item-thumb {
        display: block;
        padding-bottom: 10px;
      }

      .related_heading {
        border-top: 1px solid #cbcccf;
        text-align: center;
        padding: 25px 0 10px;
      }
      /* Data table ------------------------------ */

      body {
        background-color: #f2f4f6;
        color: #51545e;
      }

      p {
        color: #51545e;
      }

      .email-wrapper {
        width: 100%;
        margin: 0;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        background-color: #f2f4f6;
      }

      .email-content {
        width: 100%;
        margin: 0;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
      }
      /* Masthead ----------------------- */

      .email-masthead {
        padding: 25px 0;
        text-align: center;
      }

      .email-masthead_logo {
        width: 94px;
      }

      .email-masthead_name {
        font-size: 16px;
        font-weight: bold;
        color: #a8aaaf;
        text-decoration: none;
        text-shadow: 0 1px 0 white;
      }
      /* Body ------------------------------ */

      .email-body {
        width: 100%;
        margin: 0;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
      }

      .email-body_inner {
        width: 570px;
        margin: 0 auto;
        padding: 0;
        -premailer-width: 570px;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        background-color: #ffffff;
      }

      .email-footer {
        width: 570px;
        margin: 0 auto;
        padding: 0;
        -premailer-width: 570px;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        text-align: center;
      }

      .email-footer p {
        color: #a8aaaf;
      }

      .body-action {
        width: 100%;
        margin: 30px auto;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        text-align: center;
      }

      .body-sub {
        margin-top: 25px;
        padding-top: 25px;
        border-top: 1px solid #eaeaec;
      }

      .content-cell {
        padding: 45px;
      }
      /*Media Queries ------------------------------ */

      @media only screen and (max-width: 600px) {
        .email-body_inner,
        .email-footer {
          width: 100% !important;
        }
      }

      @media (prefers-color-scheme: dark) {
        body,
        .email-body,
        .email-body_inner,
        .email-content,
        .email-wrapper,
        .email-masthead,
        .email-footer {
          background-color: #333333 !important;
          color: #fff !important;
        }
        p,
        ul,
        ol,
        blockquote,
        h1,
        h2,
        h3,
        span,
        .purchase_item {
          color: #fff !important;
        }
        .attributes_content {
          background-color: #222 !important;
        }
        .email-masthead_name {
          text-shadow: none !important;
        }
      }

      :root {
        color-scheme: light dark;
        supported-color-schemes: light dark;
      }
    </style>
    <!--[if mso]>
      <style type="text/css">
        .f-fallback {
          font-family: Arial, sans-serif;
        }
      </style>
    <![endif]-->
  </head>
  <body>
    <span class="preheader">This link will expire in 10 min.</span>
    <table
      class="email-wrapper"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
    >
      <tr>
        <td align="center">
          <table
            class="email-content"
            width="100%"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
          >
            <tr>
              <td class="email-masthead">
                <a href="${base_url}" class="f-fallback email-masthead_name">
                  ⚡ Magic NextAuth
                </a>
              </td>
            </tr>
            <!-- Email Body -->
            <tr>
              <td
                class="email-body"
                width="570"
                cellpadding="0"
                cellspacing="0"
              >
                <table
                  class="email-body_inner"
                  align="center"
                  width="570"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                >
                  <!-- Body content -->
                  <tr>
                    <td class="content-cell">
                      <div class="f-fallback">
                        <p>
                          Click the button below to log in to Magic NextAuth.<br />
                          This button will expire in 10 minutes.
                        </p>
                        <!-- Action -->
                        <table
                          class="body-action"
                          align="center"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                        >
                          <tr>
                            <td align="center">
                              <!-- Border based button
           https://litmus.com/blog/a-guide-to-bulletproof-buttons-in-email-design -->
                              <table
                                width="100%"
                                border="0"
                                cellspacing="0"
                                cellpadding="0"
                                role="presentation"
                              >
                                <tr>
                                  <td>
                                    <a
                                      href="${signin_url}"
                                      class="f-fallback button"
                                      target="_blank"
                                      >Login to Magic NextAuth</a
                                    >
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <p>
                          Confirming this request will securely log you in using
                          ${email}.
                        </p>
                        <p>Best,<br />The Magic NextAuth Team</p>
                        <!-- Sub copy -->
                        <table class="body-sub" role="presentation">
                          <tr>
                            <td>
                              <p class="f-fallback sub">
                                If you’re having trouble with the button above,
                                copy and paste the URL below into your web
                                browser.
                              </p>
                              <p class="f-fallback sub">${signin_url}</p>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table
                  class="email-footer"
                  align="center"
                  width="570"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                >
                  <tr>
                    <td class="content-cell" align="center">
                      <p class="f-fallback sub align-center">
                        &copy; 2021 Magic NextAuth. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `
};

function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
const sendWelcomeEmail = async <T extends { user: User }>(message: T) => {
  try {
    console.log("messageee: ", message);
    console.log("typeof messageeee: ", typeof message);
    const result = await transporter.sendMail({
      from: `"⚡ Magic NextAuth" ${env.EMAIL_FROM}`,
      to: message.user.email,
      subject: 'Welcome to Magic NextAuth! 🎉',
      // html: emailTemplate({
      //   base_url: env.NEXTAUTH_URL,
      //   support_email: 'support@example.com',
      // }),
      html: `<div>HELLO</div>`
    }
      // , (err, info) => {
      //   // console.log(info.envelope);
      //   // console.log(info.messageId);
      //   console.log(info);
      //   console.log(err);
      // }
    );
    // const failed = result.rejected.concat(result.pending).filter(Boolean);
    // if (failed.length) {
    //   throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
    // }
  } catch (error) {
    console.log(error);
  }

}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks,
 * etc.
 *
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/signin',
    signOut: '/',
  },
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      // server: {
      //   host: env.EMAIL_SERVER_HOST,
      //   port: 465,
      //   auth: {
      //     user: env.EMAIL_SERVER_USER,
      //     pass: env.EMAIL_SERVER_PASSWORD,
      //   },
      // },
      server: env.EMAIL_SERVER,
      from: env.EMAIL_FROM,
      maxAge: 10 * 60, // Magic links are valid for 10 min only
      sendVerificationRequest(params) {
        const { identifier, url, provider } = params;
        const { host } = new URL(url);
        // NOTE: You are not required to use `nodemailer`, use whatever you want.
        // const transport = createTransport(provider.server);
        transporter.sendMail({
          to: identifier,
          from: provider.from,
          subject: `Sign in to ${host}`,
          text: text({ url, host }),
          // html: html({ url, host, theme }),
          html: html({
            base_url: env.NEXTAUTH_URL,
            signin_url: url,
            email: identifier,
          })
        }, (err, info) => {
          // console.log(info.envelope);
          // console.log(info.messageId);
          console.log(info);
          console.log(err);
          const failed = info.rejected.concat(info.pending).filter(Boolean);
          if (failed.length) {
            throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
          }
        });
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      profile(profile: Profile) {
        // const givenName = profile.given_name ?? "" + profile.family_name ?? "";
        // const username = getUsername(givenName);
        return {
          id: profile.sub,
          image: profile.picture,
          name: profile.name,
          email: profile.email,
          // username,
        };
      },
    }),
  ],
  events: {
    createUser: async (message) => {
      await sendWelcomeEmail<typeof message>(message)
    },
  },
  secret: env.NEXTAUTH_SECRET,
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the
 * `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 **/
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};







