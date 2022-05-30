import React from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Grid, TextField } from "@mui/material";

export default function Header() {
  return (
    <Grid
      container
      justifyContent={"center"}
      alignContent="center"
      style={{ backgroundColor: "#E1E1E1",padding:"0.5rem" }}
    >
      <Grid item xs md={2} lg={2} style={{ backgroundColor: "#E1E1E1",padding:"0.9rem" }}>
        <MenuOpenIcon  />
      </Grid>
      <Grid
        item
        xs={10}
        md={10}
        lg={10}
        style={{ color: "white", backgroundColor: "#E1E1E1" }}
      >
        <TextField
          id="outlined-basic"
          label="Address"
          variant="outlined"
          disabled
          style={{ color: "white" }}
        />
      </Grid>
    </Grid>
  );
}
