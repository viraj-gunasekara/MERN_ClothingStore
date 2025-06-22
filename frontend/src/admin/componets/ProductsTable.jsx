import {
  Avatar,
  Box,
  Button,
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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  findProducts,
} from "../../redux/customer/product/Action";
import { useLocation } from "react-router-dom";
import UpdateProductForm from "./UpdateProductForm";

const ProductsTable = () => {
  const dispatch = useDispatch();
  const { customerProducts } = useSelector((store) => store);
  const location = useLocation();

  // Query
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");

  console.log("Products::", customerProducts);

  const { deleteProductSuccess, createProductSuccess, updateProductSuccess } =
    customerProducts;

  useEffect(() => {
    const data = {
      category: category || "",
      colors: [],
      sizes: [],
      minPrice: "",
      maxPrice: 10000,
      minDiscount: "",
      sort: "price_low",
      pageNumber: 1,
      pageSize: 10,
      stock: "",
    };
    dispatch(findProducts(data));
  }, [
    dispatch,
    deleteProductSuccess,
    createProductSuccess,
    updateProductSuccess,
    category,
  ]);

  // delete product
  const handleDeleteProduct = (productId) => {
    console.log("delete product ", productId);
    dispatch(deleteProduct(productId));
  };

  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const handleOpen = () => {
    setOpenUpdateModal(true);
  };
  const handleClose = () => {
    setOpenUpdateModal(false);
  };

  return (
    <Box sx={{ padding: 2, paddingLeft: 25 }}>
      <Card className="mt-2" sx={{ bgcolor: "#DADADA" }}>
        <CardHeader title="All Products" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title & Brand</TableCell>
                <TableCell sx={{ textAlign: "center" }}>1st Category</TableCell>
                <TableCell sx={{ textAlign: "center" }}>2nd Category</TableCell>
                <TableCell sx={{ textAlign: "center" }}>3rd Category</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Discount %</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Sale Price</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Quantity</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Update</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customerProducts?.products?.content?.map((item) => (
                <TableRow
                  hover
                  key={item.name}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  <TableCell>
                    {" "}
                    <Avatar alt={item.titel} src={item.imageUrl} />{" "}
                  </TableCell>

                  <TableCell
                    sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.875rem !important",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="caption">{item.brand}</Typography>
                    </Box>
                  </TableCell>

                  {/* 1st Category, 2nd Category, 3rd Category  */}
                  <TableCell sx={{ textAlign: "center" }}>
                    {item?.category?.parentCategory?.parentCategory?.name || ""}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item?.category?.parentCategory?.name || ""}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item?.category?.name || ""}
                  </TableCell>

                  {/*Discount %, SalePrice, Quantity  */}
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.discountPersent}%
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.discountedPrice}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.quantity}
                  </TableCell>

                  {/* Update, Delete  */}
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button onClick={handleOpen} variant="outlined">Update</Button>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      variant="outlined"
                      onClick={() => handleDeleteProduct(item._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Update modal  */}
      <UpdateProductForm handleClose={handleClose} open={openUpdateModal}/>
    </Box>
  );
};

export default ProductsTable;
