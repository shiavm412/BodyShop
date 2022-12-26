// import axios from "axios";
import Head from "next/head";
import React from "react";

const NewPlayer: React.FC = (props: any) => {
  return (
    <>
      <h1>testing</h1>
      <Head>
        <title>{props?.data?.data?.content?.metaDesc}</title>
      </Head>

      <div
        dangerouslySetInnerHTML={{
          __html: props?.data?.data?.content?.content || "",
        }}
      />
    </>
  );
};

export default NewPlayer;

export async function getServerSideProps() {
  const config = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiI2M2EzZWQyYTQ2YWRlMzM4OGRlNjQ4YTkiLCJpc0xvZ2luIjp0cnVlLCJpc0d1ZXN0TG9naW4iOnRydWUsImlhdCI6MTY3MTY4NzQ2NiwiZXhwIjoxNjg3MjM5NDY2fQ.4Eg19HCDEGFUiw562m2nxA7T5WPHZb6bt0yZwfx6Xo0",
      deviceid: "a6bb3f72-f91f-46b4-82f2-0a588995c4bb",
      language: "en",
      offset: "-330",
      platform: "web",
    },
  };
  const res = await fetch(
    "https://bodyshopstgapi.appskeeper.in/user-service/api/v1/users/page/about",
    config
  );
  const data = await res.json();
  return { props: { data } };
}
