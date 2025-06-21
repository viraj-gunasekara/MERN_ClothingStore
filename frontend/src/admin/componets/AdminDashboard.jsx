import React from "react";
import Grid from "@mui/material/Grid";
import Achivement from "../tabs/Achivement";
import { Box } from "@mui/material";
import MonthlyOverView from "../tabs/MonthlyOverView";

const AdminDashboard = () => {
  return (
    <div>
      <Grid container spacing={3} paddingTop={1} paddingLeft={27}>
        {/* Achivement */}
        <Grid item xs={12} md={4}>
            <Achivement />
        </Grid>
        {/* Overview */}
        <Grid item xs={12} md={8}>
            <MonthlyOverView/>
        </Grid>

        <Grid item xs={12} md={12}>

        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
