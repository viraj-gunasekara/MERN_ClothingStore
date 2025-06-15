import { Avatar, Box, Grid, Rating } from "@mui/material";
import React from "react";

const ProductReviewCard = () => {
  return (
    <div>
      <Grid container spacing={2} gap={3}>
        {/* item 1 */}
        <Grid item xs={1}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: "#9155FD" }}
              alt=""
              src=""
            >
              V
            </Avatar>
          </Box>
        </Grid>

        {/* item 2 */}
        <Grid item xs={9}>
          <div className="space-y-2">
            <div className="">
              {/* f-name & date */}
              <p className="font-semibold text-lg">Viraj</p>
              <p className="opacity-70">June 15, 2025</p>
            </div>

            {/* Rating section */}
            <div>
              <Rating
                value={4.5}
                name="half-rating"
                defaultValue={2.5}
                precision={0.5}
                readOnly
              />
            </div>

            {/* User Review */}
            <p>Thie dress adds a pop of color to your ensemble, while the plain design allows you to accessorize to your liking.</p>
          </div>
        </Grid>
      </Grid>
      <div className="col-span-1 flex"></div>
    </div>
  );
};

export default ProductReviewCard;
