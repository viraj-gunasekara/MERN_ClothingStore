import React from "react";
import Grid from "@mui/material/Grid";
import Achivement from "../tabs/Achivement";
import { Box } from "@mui/material";

const AdminDashboard = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
            <Achivement />
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
