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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  findProducts,
} from "../../redux/customer/product/Action";
import { useLocation } from "react-router-dom";

const ProductsTableView = () => {
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
  

  return (
    <Box sx={{ marginRight: 2}}>
      <Card className="mt-2" sx={{ bgcolor: "#DADADA" }}>
        <CardHeader title="All Products" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title & Brand</TableCell>
                <TableCell sx={{ textAlign: "left" }}>Category Levels</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Item Price</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Discount %</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Sale Price</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Stock Quantity</TableCell>

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

                  {/* Category Lvls */}
                  <TableCell
                    sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.875rem !important",
                        }}
                      >
                        {item?.category?.parentCategory?.parentCategory?.name || ""}
                      </Typography>
                      <Typography variant="caption">{item?.category?.name || ""}</Typography>
                    </Box>
                  </TableCell>

                  {/* Item Price */}
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.price}
                  </TableCell>
                  {/* Discount % */}
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.discountPersent}
                  </TableCell>
                  {/* Sale Price */}
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.discountedPrice}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.quantity}
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

export default ProductsTableView;
