import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findCustomers } from "../../redux/admin/Action";

const CustomersTable = () => {
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.customerUsers);

  console.log("Customers::", customers);

  useEffect(() => {
    const data = {
      pageNumber: 1,
      pageSize: 10,
    };
    dispatch(findCustomers(data));
  }, [dispatch]);

  const sortedCustomers = [...(customers || [])].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <Box sx={{ paddingLeft: 25 }}>
      <Card className="mt-2" sx={{ bgcolor: "#DADADA" }}>
        <CardHeader title="Recent Customers" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell sx={{ textAlign: "left" }}>First Name</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Sign-Up On</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedCustomers.slice(0, 10).map((customer) => (
                <TableRow
                  hover
                  key={customer._id}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  {/* email firstName lastName createdAt */}
                  <TableCell sx={{ textAlign: "left" }}>
                    {customer.email}
                  </TableCell>
                  <TableCell sx={{ textAlign: "left" }}>
                    {customer.firstName}
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "center", py: (theme) => `${theme.spacing(0.5)} !important` }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.875rem !important",
                        }}
                      >
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </Typography>
                      <Typography variant="caption">
                        {new Date(customer.createdAt).toLocaleTimeString()}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default CustomersTable;
