import React from "react";
import { Grid, TextField } from "@mui/material/";
import RouteNav from "components/layouts/RouteNav";

import MyMap from "components/routing/Map";
import Header from "components/routing/Header";
import DisplayRoute from "components/routing/DisplayRoute";
import Details from "components/routing/Details";

export default function Main() {
  return (
    <Grid
      container
      sx={{
        paddingTop: "0px",
      }}
    >
      <Grid
        container
        xs={12}
        md={12}
        lg={12}
        justifyContent="center"
        alignContent={"center"}
      >
        <Grid item xs={12} md={4} lg={4}>
          <Header />
        </Grid>

        <Grid item xs={12} md={8} lg={8}>
          <RouteNav />
        </Grid>
      </Grid>

      <Grid container item xs={12} md={12} lg={12} >
        <Grid item xs={12} md={4} lg={4}>
          <Details />
        </Grid>

        <Grid item  xs={12} md={8} lg={8}>
          <Grid item xs={12} md={12} lg={12}>
            <DisplayRoute />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <MyMap />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
