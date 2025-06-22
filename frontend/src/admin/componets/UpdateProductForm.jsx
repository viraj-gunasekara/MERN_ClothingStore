import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  outline: "none",
};


const UpdateProductForm = ({ handleClose, open }) => {
  const initialProductData = {
    imageUrl: "",
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    discountPersent: 0,
    size: [
      { name: "S", quantity: 0 },
      { name: "M", quantity: 0 },
      { name: "L", quantity: 0 },
    ],
    quantity: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
    description: "",
  };

  const [productData, setProductData] = useState(initialProductData);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      size="large"
    >
      <Box sx={{ padding: 2, paddingLeft: 25, style }} className="rounded-md">
        <Card className="mt-2 p-6">

          {/* Close Icon */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={handleClose}>
              <DisabledByDefaultIcon/>
            </IconButton>
          </Box>

          <Fragment>
            <Typography
              variant="h5"
              sx={{ textAlign: "center", paddingBottom: 3 }}
              className="py-3 text-center "
            >
              Update Product
            </Typography>
            {/* product form */}
            <form>
              <Grid container spacing={2}>
                <Grid item size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Image URL"
                    name="imageUrl"
                    size="small"
                    // value={productData.imageUrl}
                    // onChange={handleChange}
                  />
                </Grid>
                <Grid item size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Brand"
                    name="brand"
                    size="small"
                    // value={productData.brand}
                    // onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    size="small"
                    // value={productData.title}
                    // onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Color"
                    name="color"
                    size="small"
                    // value={productData.color}
                    // onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    name="quantity"
                    size="small"
                    // value={productData.quantity}
                    // onChange={handleChange}
                    type="number"
                    required
                  />
                </Grid>
                <Grid item size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    size="small"
                    // value={productData.price}
                    // onChange={handleChange}
                    type="number"
                    required
                  />
                </Grid>
                <Grid item size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    label="Discounted (Final) Price"
                    name="discountedPrice"
                    size="small"
                    // value={productData.discountedPrice}
                    // onChange={handleChange}
                    type="number"
                    required
                  />
                </Grid>

                <Grid item size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    label="Discount Percentage"
                    name="discountPersent"
                    size="small"
                    // value={productData.discountPersent}
                    // onChange={handleChange}
                    type="number"
                  />
                </Grid>
                <Grid item size={{ xs: 6, sm: 4 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Top Level Category</InputLabel>
                    <Select
                      name="topLevelCategory"
                      // value={productData.topLevelCategory}
                      // onChange={handleChange}
                      label="Top Level Category"
                    >
                      <MenuItem value="men">Men</MenuItem>
                      <MenuItem value="women">Women</MenuItem>
                      <MenuItem value="kids">Kids</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item size={{ xs: 6, sm: 4 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Second Level Category</InputLabel>
                    <Select
                      name="secondLevelCategory"
                      // value={productData.secondLevelCategory}
                      // onChange={handleChange}
                      label="Second Level Category"
                    >
                      <MenuItem value="clothing">Clothing</MenuItem>
                      <MenuItem value="accessories">Accessories</MenuItem>
                      <MenuItem value="brands">Brands</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item size={{ xs: 6, sm: 4 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Third Level Category</InputLabel>
                    <Select
                      name="thirdLevelCategory"
                      // value={productData.thirdLevelCategory}
                      // onChange={handleChange}
                      label="Third Level Category"
                    >
                      <MenuItem value="top">Tops</MenuItem>
                      <MenuItem value="women_dress">Dresses</MenuItem>
                      <MenuItem value="t-shirts">T-Shirts</MenuItem>
                      <MenuItem value="saree">Saree</MenuItem>
                      <MenuItem value="lengha_choli">Lengha Choli</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    name="description"
                    rows={3}
                    size="small"
                    // onChange={handleChange}
                    // value={productData.description}
                    required
                  />
                </Grid>
                {productData.size.map((size, index) => (
                <Grid container item spacing={2}>
                  <Grid item size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Size Name"
                      name="name"
                      size="small"
                      value={size.name}
                      // onChange={(event) => handleSizeChange(event, index)}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Quantity"
                      name="size_quantity"
                      type="number"
                      size="small"
                      // onChange={(event) => handleSizeChange(event, index)}
                      fullWidth
                    />
                  </Grid>{" "}
                </Grid>
                ))}
                <Grid item size={{ xs: 12 }}>
                  <Button
                    variant="contained"
                    sx={{ p: 1.8 }}
                    className="py-20"
                    size="small"
                    type="submit"
                  >
                    Update The Product
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Fragment>
        </Card>
      </Box>
    </Modal>
  );
};

export default UpdateProductForm;
