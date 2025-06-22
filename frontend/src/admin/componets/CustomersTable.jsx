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

  return (
    <Box sx={{ padding: 2, paddingLeft: 25 }}>
      <Card className="mt-2" sx={{ bgcolor: "#DADADA" }}>
        <CardHeader title="All Customers" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Profile Image</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Sign-Up On</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers?.map((customer) => (
                <TableRow
                  hover
                  key={customer._id}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  <TableCell>
                    <Avatar
                      className="text-white"
                      sx={{
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      {customer.firstName[0].toUpperCase()}
                    </Avatar>
                  </TableCell>

                  {/* email firstName lastName createdAt */}
                  <TableCell sx={{ textAlign: "left" }}>
                    {customer.email}
                  </TableCell>
                  <TableCell sx={{ textAlign: "left" }}>
                    {customer.firstName}
                  </TableCell>
                  <TableCell sx={{ textAlign: "left" }}>
                    {customer.lastName}
                  </TableCell>
                  <TableCell sx={{ textAlign: "left" }}>
                    {customer.createdAt}
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
