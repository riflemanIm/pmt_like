import { Grid } from "@mui/material";
import BlogCard from "../src/components/dashboard/BlogCard";
// import SalesOverview from "../src/components/dashboard/SalesOverview";
// import DailyActivity from "../src/components/dashboard/DailyActivity";
// import ProductPerfomance from "../src/components/dashboard/ProductPerfomance";
import FullLayout from "../src/layouts/FullLayout";
import Effect from "../src/components/dashboard/Effekt";
import img from "../assets/images/bg/bg19.jpg";

export default function Index({ menu }) {
  //console.log("menu", menu);
  return (
    <FullLayout menu={menu} img={img.src}>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <Effect />
        </Grid>
        {/* ------------------------- row 1 ------------------------- */}
        {/* <Grid item xs={12} lg={4}>
          <DailyActivity />
        </Grid>
        <Grid item xs={12} lg={8}>
          <ProductPerfomance />
        </Grid> */}
        <Grid item xs={12} lg={12} my={6}></Grid>
        <Grid item xs={12} lg={12}>
          <BlogCard />
        </Grid>
      </Grid>
    </FullLayout>
  );
}
// export async function getServerSideProps(context) {
//   const locale = context.locale;
//   const postData1 = {
//     method: "Post",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       locale,
//     }),
//   };
//   const res = await fetch(`${process.env.API_URL}/menu`, postData1);
//   const menu = await res.json();

//   return { props: { menu } };
// }
