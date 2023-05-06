import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/auth/AuthContext";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
