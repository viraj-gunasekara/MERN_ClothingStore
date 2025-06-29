"use client";

import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { Box, Button, Grid, LinearProgress, Rating } from "@mui/material";
import ProductReviewCard from "./ProductReviewCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductsById } from "../../../redux/customer/product/Action";

const productDummy = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    {
      id: "white",
      name: "White",
      classes: "bg-white checked:outline-gray-400",
    },
    {
      id: "gray",
      name: "Gray",
      classes: "bg-gray-200 checked:outline-gray-400",
    },
    {
      id: "black",
      name: "Black",
      classes: "bg-gray-900 checked:outline-gray-900",
    },
  ],
  sizes: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };

const userReviews = [
  {
    name: "Chamari Rathnayake",
    date: "June 15, 2025",
    rating: 4.5,
    review:
      "High quality material with a flattering cut. These shorts stay cool even in heat and match with almost everything in my wardrobe.",
  },
  {
    name: "Nuwan Perera",
    date: "June 18, 2025",
    rating: 4,
    review:
      "Really comfortable and stylish shorts. The fabric feels premium and fits true to size. Would definitely buy another color too.",
  },
  {
    name: "Ishara Fernando",
    date: "June 20, 2025",
    rating: 5,
    review:
      "Perfect summer wear! Super breathable and the fit is great. I love how easy it is to style these.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const { customerProducts } = useSelector((store) => store);

  const product = customerProducts.product;
  console.log("product check:", product);

  const Chevron = () => (
    <svg
      fill="currentColor"
      width={16}
      height={20}
      viewBox="0 0 16 20"
      aria-hidden="true"
      className="h-5 w-4 text-gray-700"
    >
      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
    </svg>
  );

  // Capitalize helper
  const capitalizeWords = (str) =>
    str?.replace(/_/g, " ")?.replace(/\b\w/g, (char) => char.toUpperCase());

  const thirdLevel = product?.category;
  const secondLevel = thirdLevel?.parentCategory;
  const topLevel = secondLevel?.parentCategory;

  const thirdLevelId = thirdLevel?._id;
  const secondLevelId = secondLevel?._id;
  const topLevelId = topLevel?._id;

  const thirdLevelName = thirdLevel?.name;
  const secondLevelName = secondLevel?.name;
  const topLevelName = topLevel?.name;

  console.log("category check:", {
    thirdLevelName,
    secondLevelName,
    topLevelName,
    thirdLevelId,
    secondLevelId,
    topLevelId,
  });

  console.log("params----", params.productId);

  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const data = { productId: params.productId };
    dispatch(findProductsById(data));
  }, [params.productId]);

  useEffect(() => {
    if (product?.sizes?.length > 0) {
      setSelectedSize(product.sizes[2]);
    }
  }, [product]);

  if (!product) {
    return <div>Loading product...</div>;
  }

  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {topLevel && (
              <li>
                <div className="flex items-center">
                  <a
                    href={`/${topLevel.name.toLowerCase()}`}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {capitalizeWords(topLevel.name)}
                  </a>
                  <Chevron />
                </div>
              </li>
            )}

            {secondLevel && (
              <li>
                <div className="flex items-center">
                  <a
                    href={`/${topLevel.name.toLowerCase()}/${secondLevel.name.toLowerCase()}`}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {capitalizeWords(secondLevel.name)}
                  </a>
                  <Chevron />
                </div>
              </li>
            )}

            {thirdLevel && (
              <li>
                <div className="flex items-center">
                  <a
                    href={`/${topLevel.name.toLowerCase()}/${secondLevel.name.toLowerCase()}/${thirdLevel.name.toLowerCase()}`}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {capitalizeWords(thirdLevel.name)}
                  </a>
                  <Chevron />
                </div>
              </li>
            )}

            <li className="text-sm">
              <span className="font-medium text-gray-500">
                {product?.title}
              </span>
            </li>
          </ol>
        </nav>

        <section className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center ">
            <div className=" overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                alt={product.images?.[0]?.alt || "Product Image"}
                src={customerProducts.product?.imageUrl}
                className="row-span-2 aspect-3/4 size-full rounded-lg object-cover max-lg:hidden"
              />
            </div>
            {/* section2 */}
            <div className="flex flex-wrap space-x-5 justify-center">
              {productDummy.images.map((item) => (
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4">
                  <img
                    alt={item.alt}
                    src={item.src}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="lg:col-span-1 mx-auto max-w-2xl px-4 pb-16 sm:px-6  lg:max-w-7xl  lg:px-8 lg:pb-24">
            <div className="lg:col-span-2">
              <h1 className="text-lg lg:text-xl font-semibold tracking-tight text-gray-900">
                {customerProducts.product?.brand}
              </h1>
              <h1 className="text-lg lg:text-xl tracking-tight text-gray-900 opacity-60 pt-1">
                {customerProducts.product?.title}
              </h1>
              <p className="font-semibold opacity-50 pt-2">
                {customerProducts.product?.color}
              </p>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex space-x-5 items-center text-lg lg:text-xl tracking-tight text-gray-900 mt-6">
                <p className="font-semibold">
                  Rs.{customerProducts.product?.discountedPrice}
                </p>
                <p className="opacity-50 line-through">
                  Rs.{customerProducts.product?.price}
                </p>
                <p className="text-green-600 font-semibold">
                  {customerProducts.product?.discountPersent}% Off
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center space-x-3">
                  <Rating
                    name="read-only"
                    value={4.6}
                    precision={0.5}
                    readOnly
                  />
                  <p className="opacity-60 text-sm">214 Ratings</p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    19 Reviews
                  </p>
                </div>
              </div>

              <form className="mt-10">
                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                    >
                      {productDummy.sizes.map((size) => (
                        <Radio
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={classNames(
                            size.inStock
                              ? "cursor-pointer bg-white text-gray-900 shadow-xs"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-hidden data-focus:ring-2 data-focus:ring-indigo-500 sm:flex-1 sm:py-6"
                          )}
                        >
                          <span>{size.name}</span>
                          {size.inStock ? (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-checked:border-indigo-500 group-data-focus:border"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                stroke="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                className="absolute inset-0 size-full stroke-2 text-gray-200"
                              >
                                <line
                                  x1={0}
                                  x2={100}
                                  y1={100}
                                  y2={0}
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </span>
                          )}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>

                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    padding: ".8rem 2rem",
                    marginTop: "2rem",
                    bgcolor: "#4a0080",
                  }}
                >
                  Add To Cart
                </Button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {customerProducts.product?.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {productDummy.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">
                    {productDummy.details}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* rating and review section */}
        <section className="pb-8">
          <h1 className="font-semibold text-lg pb-4">
            Recent Review & Ratings
          </h1>

          <div className="border p-5">
            <Grid container spacing={7}>
              <Grid size={{ xs: 7 }}>
                <div className="space-y-5">
                  {userReviews.map((review, index) => (
                    <ProductReviewCard
                      key={index}
                      name={review.name}
                      date={review.date}
                      rating={review.rating}
                      review={review.review}
                    />
                  ))}
                </div>
              </Grid>

              {/* Overall ratings */}
              <Grid size={{ xs: 5 }}>
                {/* top part */}
                <h1 className="text-xl font-semibold pb-2">Product Ratings</h1>
                <div className="flex items-center space-x-3 pb-4">
                  <Rating
                    name="read-only"
                    value={4.6}
                    precision={0.5}
                    readOnly
                  />
                  <p className="opacity-60">214 Ratings</p>
                </div>

                {/* middle part */}
                <Box className="mt-5 space-y-2">
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Grid size={{ xs: 2 }}>
                      <p className="p-0">Excellent</p>
                    </Grid>
                    <Grid size={{ xs: 7 }}>
                      <LinearProgress
                        variant="determinate"
                        value={90}
                        sx={{
                          bgcolor: "#e0e0e0",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#2e7d32", // deep green
                          },
                          borderRadius: 4,
                          height: 7,
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 2 }}>
                      <p className="opacity-50 p-2">149</p>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Grid size={{ xs: 2 }}>
                      <p className="p-0">Very Good</p>
                    </Grid>
                    <Grid size={{ xs: 7 }}>
                      <LinearProgress
                        variant="determinate"
                        value={70}
                        sx={{
                          bgcolor: "#e0e0e0",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#0288d1", // medium blue
                          },
                          borderRadius: 4,
                          height: 7,
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 2 }}>
                      <p className="opacity-50 p-2">57</p>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Grid size={{ xs: 2 }}>
                      <p className="p-0">Good</p>
                    </Grid>
                    <Grid size={{ xs: 7 }}>
                      <LinearProgress
                        variant="determinate"
                        value={50}
                        sx={{
                          bgcolor: "#e0e0e0",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#ffdd00", // amber
                          },
                          borderRadius: 4,
                          height: 7,
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 2 }}>
                      <p className="opacity-50 p-2">23</p>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Grid size={{ xs: 2 }}>
                      <p className="p-0">Average</p>
                    </Grid>
                    <Grid size={{ xs: 7 }}>
                      <LinearProgress
                        variant="determinate"
                        value={30}
                        sx={{
                          bgcolor: "#e0e0e0",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#fb8c00", // orange
                          },
                          borderRadius: 4,
                          height: 7,
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 2 }}>
                      <p className="opacity-50 p-2">14</p>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Grid size={{ xs: 2 }}>
                      <p className="p-0">Poor</p>
                    </Grid>
                    <Grid size={{ xs: 7 }}>
                      <LinearProgress
                        variant="determinate"
                        value={15}
                        sx={{
                          bgcolor: "#e0e0e0",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#d32f2f", // red
                          },
                          borderRadius: 4,
                          height: 7,
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 2 }}>
                      <p className="opacity-50 p-2">3</p>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </div>
        </section>
      </div>
    </div>
  );
}
