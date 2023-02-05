import { AuthProvider } from "@/auth/AuthProvider";
import { BookProvider } from "@/book/BookProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <BookProvider>
        <Component {...pageProps} />
      </BookProvider>
    </AuthProvider>
  );
}
