import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/auth/AuthContext";
import Head from "next/head";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      {/* 
        MEMO: 
        pages/_document.tsxに<title>を追加すると以下のような警告が出るため、代わりにpages/_app.tsxに追加すること。
        https://nextjs.org/docs/messages/no-document-title
       */}
      <Head>
        <title>My Daily Word</title>
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
