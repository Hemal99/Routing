import React from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Grid, TextField, Card, CardContent, Typography } from "@mui/material";

export default function Header() {
  return (
    <Card m={1}>
      <CardContent>
        <Grid
          container
          justifyContent={"flex-start"}
          alignContent="center"
          p={2}
          style={{ width: "100%", borderColor: "black" }}
        >
          <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h6">Selected Dates</Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12}></Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
