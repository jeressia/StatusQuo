import { AppProps } from "next/app";
import Head from "next/head";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";
import { UserProvider } from "../components/UserProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>StatusQuo</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <UserProvider>
        <div>
          <Component {...pageProps} />
        </div>
      </UserProvider>
    </>
  );
}

export default MyApp;
