import { AppProps } from "next/app";
import Head from "next/head";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>StatusQuo</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <div className="mobile-container">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
