import Head from "next/head";
import { useSelector } from "react-redux";
import Home from "../component/components/pagesComponents/home";
import { getHomeData } from "../store/home/action";
import { wrapper } from "../store/store";

export default function Index() {
  const state = useSelector((state: any) => state.homeReducer);

  return (
    <>
      <Head>
        <title>The BodyShop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.svg" />
      </Head>

      <Home />
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  //@ts-ignore-
  async ({ req, res }) => {
    await store.dispatch(getHomeData());
    return { props: {} };
  }
);
