import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import Image from "next/image";
import news from "../../../data/news";
//import educationContent from "../../data/education";

const BlogCard = () => {
  return (
    <>
      <Typography variant="h2" mb={3}>
        Новости
      </Typography>
      <Grid container spacing={3}>
        {news.map((blog, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
            //
            sx={{
              display: "flex",
              alignItems: "stretch",
            }}
          >
            <Card
              sx={{
                p: 0,
                width: "100%",
              }}
            >
              <div
                style={{ position: "relative", width: "100%", height: "220px" }}
              >
                <Image
                  fill
                  src={blog.img}
                  alt="img"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <CardContent
                sx={{
                  paddingLeft: "30px",
                  paddingRight: "30px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "500",
                  }}
                >
                  {blog.title}
                </Typography>
                <Typography
                  color="textSecondary"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    mt: 1,
                  }}
                >
                  {blog.subtitle}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: "15px",
                  }}
                  color={blog.btncolor}
                >
                  Далее
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default BlogCard;
