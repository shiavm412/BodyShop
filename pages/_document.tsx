import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@mui/styles";
import Script from "next/script";

const ZENDESK_KEY = `${process.env.NEXT_PUBLIC_ZENDESK_ID}`;

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                   function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T39L5VN';`,
            }}
          ></script>
        </Head>

        <body>
          {/* Google Tag Manager (noscript) */}

          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-T39L5VN"
              height="0"
              width="0"
              style="display:none;visibility:hidden"
            ></iframe>`,
            }}
          />
          {/* End Google Tag Manager (noscript) */}
          <Main />
          <NextScript />
          <Script
            id="ze-snippet"
            src={`https://static.zdassets.com/ekr/snippet.js?key=${ZENDESK_KEY}`}
            strategy="afterInteractive"
            onLoad={() => {
              if (navigator.onLine) {
                document.onreadystatechange = function () {
                  if (document.readyState == "complete") {
                    var user = {};
                    if (localStorage.getItem("guestUser") !== "true") {
                      user = {
                        name: localStorage.getItem("fullName"),
                        email: localStorage.getItem("email"),
                        phone: localStorage.getItem("mobileNo"),
                      };
                    }
                    //@ts-ignore
                    zE("webWidget", "identify", user);
                    if (localStorage.getItem("underMaintenance") === "1") {
                      //@ts-ignore
                      zE && zE.hide();
                    }
                  }
                };
              }
            }}
          />

          <Script src="https://accounts.google.com/gsi/client" async defer />
          <Script
            src="https://bodyshopstgweb.appskeeper.in/iovation-loader-5.x.js"
            strategy="lazyOnload"
            onLoad={() => {
              if (navigator.onLine) {
                window.IGLOO = window.IGLOO || {
                  enable_rip: true, // Enable Real IP protection.
                  enable_flash: false, // Disable flash
                  install_flash: false, // Don't ask user to install flash
                  loader: {
                    version: "general5", // Non-experimental 5.x updates
                    fp_static: false, // Don't load 1st party resources
                  },
                };
              }
            }}
          />

          <Script
            id="razPayId"
            src="https://checkout.razorpay.com/v1/razorpay.js"
          />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });
  const initialProps = await Document.getInitialProps(ctx);
  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
