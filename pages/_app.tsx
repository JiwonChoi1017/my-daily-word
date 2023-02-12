import { AuthProvider } from "@/context/auth/AuthProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  // TODO:そろそろデザインを決めたい
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
