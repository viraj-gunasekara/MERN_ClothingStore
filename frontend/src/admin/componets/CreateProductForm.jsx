import { useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/customer/product/Action";

const CreateProductForm = () => {
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

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === "topLevelCategory") {
        updated.secondLevelCategory = "";
        updated.thirdLevelCategory = "";
      }

      if (name === "secondLevelCategory") {
        updated.thirdLevelCategory = "";
      }

      return updated;
    });
  };

  const handleSizeChange = (e, index) => {
    let { name, value } = e.target;
    name === "size_quantity" ? (name = "quantity") : (name = e.target.name);

    const sizes = [...productData.size];
    sizes[index][name] = value;
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

  const handleAddSize = () => {
    const sizes = [...productData.size];
    sizes.push({ name: "", quantity: "" });
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(productData));
    console.log(productData);

    setProductData(initialProductData);
  };

  // category map
  const categoryMap = {
    men: {
      clothing: [
        "t_shirts",
        "shirts",
        "polos",
        "trousers",
        "shorts",
        "hoodies",
        "joggers",
        "active_wear",
      ],
      innerwear: ["boxers", "vests", "socks"],
      accessories: ["wallets", "belts", "caps", "footwear", "perfumes"],
    },
    women: {
      clothing: [
        "t_shirts",
        "shirts",
        "blouses",
        "skirts",
        "pants",
        "shorts",
        "active_wear",
      ],
      innerwear: ["night_wear", "bra", "panties"],
      accessories: [
        "hand_bags",
        "wallets",
        "footwear",
        "sunglass",
        "jewellery",
        "perfumes",
      ],
    },
    kids: {
      toys: ["plush_toys", "r_c_toys", "dolls", "board_games"],
      boys: [
        "shirts",
        "t_shirts",
        "pants",
        "shorts",
        "night_wear",
        "inner_wear",
      ],
      girls: [
        "frocks",
        "t_shirts",
        "pants",
        "shorts",
        "night_wear",
        "inner_wear",
      ],
    },
  };

  const secondLevelOptions = productData.topLevelCategory
    ? Object.keys(categoryMap[productData.topLevelCategory])
    : [];

  const thirdLevelOptions =
    productData.topLevelCategory &&
    productData.secondLevelCategory &&
    categoryMap[productData.topLevelCategory][productData.secondLevelCategory]
      ? categoryMap[productData.topLevelCategory][
          productData.secondLevelCategory
        ]
      : [];

  return (
    <Box sx={{ padding: 2, paddingLeft: 25 }}>
      <Card className="mt-2 p-6">
        <Fragment>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              paddingBottom: 3,
              fontWeight: "semi-bold",
            }}
            className="py-3 text-center "
          >
            Add New Product
          </Typography>
          <form onSubmit={handleSubmit} className="min-h-screen">
            <Grid container spacing={2}>
              <Grid item size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Image URL"
                  name="imageUrl"
                  size="small"
                  value={productData.imageUrl}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Brand"
                  name="brand"
                  size="small"
                  value={productData.brand}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  size="small"
                  value={productData.title}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Color"
                  name="color"
                  size="small"
                  value={productData.color}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Quantity"
                  name="quantity"
                  size="small"
                  value={productData.quantity}
                  onChange={handleChange}
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
                  value={productData.price}
                  onChange={handleChange}
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
                  value={productData.discountedPrice}
                  onChange={handleChange}
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
                  value={productData.discountPersent}
                  onChange={handleChange}
                  type="number"
                />
              </Grid>
              <Grid item size={{ xs: 6, sm: 4 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Top Level Category</InputLabel>
                  <Select
                    name="topLevelCategory"
                    value={productData.topLevelCategory}
                    onChange={handleChange}
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
                    value={productData.secondLevelCategory}
                    onChange={handleChange}
                    label="Second Level Category"
                  >
                    {secondLevelOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item size={{ xs: 6, sm: 4 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Third Level Category</InputLabel>
                  <Select
                    name="thirdLevelCategory"
                    value={productData.thirdLevelCategory}
                    onChange={handleChange}
                    label="Third Level Category"
                  >
                    {thirdLevelOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </MenuItem>
                    ))}
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
                  onChange={handleChange}
                  value={productData.description}
                  required
                  size="small"
                />
              </Grid>
              {productData.size.map((size, index) => (
                <Grid container item spacing={2}>
                  <Grid item size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Size Name"
                      name="name"
                      value={size.name}
                      onChange={(event) => handleSizeChange(event, index)}
                      required
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Quantity"
                      name="size_quantity"
                      type="number"
                      onChange={(event) => handleSizeChange(event, index)}
                      fullWidth
                      size="small"
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
                  Add New Product
                </Button>
                {/* <Button
              variant="contained"
              sx={{ p: 1.8 }}
              className="py-20 ml-10"
              size="large"
              onClick={()=>handleAddProducts(dressPage1)}
            >
              Add Products By Loop
            </Button> */}
              </Grid>
            </Grid>
          </form>
        </Fragment>
      </Card>
    </Box>
  );
};

export default CreateProductForm;
