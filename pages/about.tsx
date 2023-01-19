// import axios from "axios";
import Head from "next/head";
import React from "react";
import { wrapper } from "../store/store";
import { getAboutData } from "../store/about/aboutAction";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material";
import { useRouter } from "next/router";

const About: React.FC = (props: any) => {
  const state = useSelector((state: any) => state.aboutReducer);

  return (
    <>
      <Head>
        <title>{state?.data?.data?.content?.metaDesc}</title>
      </Head>
      <h1>testing</h1>

      <div
        dangerouslySetInnerHTML={{
          __html: state?.data?.data?.content?.content || "",
        }}
      />
    </>
  );
};

export default About;

// export async function getServerSideProps() {
  // const config = {
  //   headers: {
  //     Authorization:
  //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiI2M2EzZWQyYTQ2YWRlMzM4OGRlNjQ4YTkiLCJpc0xvZ2luIjp0cnVlLCJpc0d1ZXN0TG9naW4iOnRydWUsImlhdCI6MTY3MTY4NzQ2NiwiZXhwIjoxNjg3MjM5NDY2fQ.4Eg19HCDEGFUiw562m2nxA7T5WPHZb6bt0yZwfx6Xo0",
  //     deviceid: "a6bb3f72-f91f-46b4-82f2-0a588995c4bb",
  //     language: "en",
  //     offset: "-330",
  //     platform: "web",
  //   },
  // };
//   const res = await fetch(
//     "https://bodyshopstgapi.appskeeper.in/user-service/api/v1/users/page/about",
//     config
//   );
//   const data = await res.json();
//   return { props: { data } };
// }

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  //@ts-ignore-
  async ({ req, res }) => {
    await store.dispatch(getAboutData());
    return { props: {} };
  }
);
