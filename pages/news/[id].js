import React from "react";

export default function NewsPage(props) {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        sss
      </Grid>
    </Grid>
  );
}

//Another option using getserversideprops, but must pass {data} to the page
export async function getServerSideProps(context) {
  const { id } = context.query;
  const locale = context.locale;

  const postData = {
    method: "Post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      route,
      locale,
    }),
  };
  let res = await fetch(`${process.env.API_URL}/page`, postData);
  const data = await res.json();

  const postData1 = {
    method: "Post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      locale,
    }),
  };
  const res1 = await fetch(`${process.env.API_URL}/menu`, postData1);
  const menu = await res1.json();
  return { props: { data, menu } };
}
