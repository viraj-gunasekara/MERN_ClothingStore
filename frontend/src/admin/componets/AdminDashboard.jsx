import React from "react";
import Grid from "@mui/material/Grid";
import Achivement from "../tabs/Achivement";
import { Box } from "@mui/material";
import MonthlyOverView from "../tabs/MonthlyOverView";
import ProductsTableView from "../tabs/ProductsTableView";
import CustomersTableView from "../tabs/CustomersTableView";

const AdminDashboard = () => {
  return (
    <div>
      <Grid container spacing={3} paddingTop={1} >
        {/* Achivement */}
        <Grid item size={{ xs: 12, md: 5 }}>
            <Achivement />
        </Grid>
        {/* Overview */}
        <Grid item size={{ xs: 12, md: 7 }}>
            <MonthlyOverView/>
        </Grid>
        {/* Customers Table View  */}
        <Grid item size={{ xs: 12, md: 5 }}>
            <CustomersTableView/>
        </Grid>
        {/* Products Table View  */}
        <Grid item size={{ xs: 12, md: 7 }}>
            <ProductsTableView/>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
