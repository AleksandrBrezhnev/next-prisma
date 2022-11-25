import globalStyles from "../styles/global";
import "normalize.css";
import createEmotionCache from "../shared/createEmotionCache";
import type { AppProps } from "next/app";
import { CacheProvider, Global } from "@emotion/react";

import Layout from "../components/Layout";

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Global styles={globalStyles} />
      <Layout>
        <Component {...pageProps} />
      </Layout>

    </CacheProvider>
  );
}

export default MyApp;
