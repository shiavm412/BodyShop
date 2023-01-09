import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../config/createEmotionCache";
import theme from "../config/theme";
import { wrapper } from "../store/store";
import { Provider } from "react-redux";
import Headers from "../component/components/headers";
import Footer from "../component/components/footers";
import "../styles/globals.css";
import "react-multi-carousel/lib/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { StylesProvider, createGenerateClassName } from "@mui/styles";
import { Box } from "@mui/material";
import MediaFooter from "../component/components/footers/mediaFooter";
import { getAuthToken } from "../store/home/action";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const generateClassName = createGenerateClassName({
  productionPrefix: "c",
});

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  ...rest
}: MyAppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <StylesProvider generateClassName={generateClassName}>
            <Headers />

            <Box sx={{ marginTop: "90px" }}>
              <Component {...props.pageProps} />
            </Box>

            <MediaFooter />
            <Footer />
          </StylesProvider>
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}
export default MyApp;

// MyApp.getInitialProps = wrapper.getInitialAppProps((store) =>
//   //@ts-ignore-
//   async ({ req, res }) => {

    // await store.dispatch(getAuthToken());

//     return {
//       props: {},
//     };
//   }
// );
