import React from "react";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./footer/Footer";

interface FullLayoutProps {
  children: React.ReactNode;
  img: string;
}

const MainWrapper = styled("div")<{ img: string }>(({ img }) => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
  //backgroundImage: `url(${img})`,
  backgroundPosition: "top",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  alignItems: "center",
  backgroundImage: `
        linear-gradient(to bottom, rgba(113,132,184, .1), rgba(113,132,184, .45)), 
        url(${img})`,
  //filter: "blur(5px)",
}));

const PageWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  backgroundColor: theme.palette.background.default,
  paddingTop: "74px",
}));

const FullLayout: React.FC<FullLayoutProps> = ({ children, img }) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState<boolean>(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] =
    React.useState<boolean>(false);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  return (
    <MainWrapper img={img}>
      <Container>
        <Header
          sx={{
            paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
            backgroundColor: "#fbfbfb70",
            backdropFilter: "saturate(180%) blur(5px)",
          }}
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
        <PageWrapper>
          <Container
            maxWidth={false}
            sx={{
              paddingTop: "20px",
              marginLeft: 2,
              paddingLeft: isSidebarOpen && lgUp ? "280px!important" : "",
            }}
          >
            <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
            <Footer />
          </Container>
        </PageWrapper>
      </Container>
    </MainWrapper>
  );
};

export default FullLayout;
