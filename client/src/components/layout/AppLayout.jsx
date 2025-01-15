import React from "react";
import Header from "../layout/Header";
import Title from "../Shared/Title";
import { Grid } from "@mui/material";
import ChatList from "../specific/ChatList";

const AppLayout = (WrappedComponent, sampleChats = []) => {
  return (props) => (
    <>
      {/* Title Section */}
      <Title />

      {/* Header Section */}
      <Header />

      {/* Layout Grid */}
      <Grid container height="calc(100vh - 4rem)">
        
        {/* Sidebar Section */}
        <Grid
          item
          xs={4}
          sm={4}
          md={3}
          sx={{ display: { xs: "none", sm: "block" } }}
          height="100%"
        >
          <ChatList chats={sampleChats} />
        </Grid>

        {/* Main Content Section */}
        <Grid item xs={12} sm={8} md={5} lg={6} height="100%">
          <WrappedComponent {...props} />
        </Grid>

        {/* Additional Sidebar Section */}
        <Grid
          item
          md={4}
          lg={3}
          height="100%"
          sx={{
            display: { xs: "none", md: "block" },
            padding: "2rem",
            bgcolor: "rgba(0, 0, 0, 0.85)",
            color: "white",
          }}
        >
          <div>Third</div>
        </Grid>
      </Grid>
    </>
  );
};

export default AppLayout;