import { Head, Html, Main, NextScript } from "next/document";

import React from "react";

const Document = () => {
  return (
    <Html>
      <Head>
        {/* フォント */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200;400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
