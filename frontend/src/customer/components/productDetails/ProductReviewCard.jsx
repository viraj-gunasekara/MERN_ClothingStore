import { Avatar, Box, Grid, Rating } from "@mui/material";
import React from "react";

const ProductReviewCard = ({ name, date, rating, review, avatarLetter }) => {
  return (
    <div>
      <Grid container spacing={2} gap={3}>
        {/* item 1 */}
        <Grid item size={{ xs: 1 }}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: "#9155FD" }}
              alt=""
              src=""
            >
              {avatarLetter || name?.charAt(0)}
            </Avatar>
          </Box>
        </Grid>

        {/* item 2 */}
        <Grid item size={{ xs: 9 }} wrap="wrap">
          <div className="space-y-2">
            <div>
              <p className="font-semibold text-lg">{name}</p>
              <p className="opacity-70">{date}</p>
            </div>

            <div>
              <Rating
                value={rating}
                name="half-rating"
                precision={0.5}
                readOnly
              />
            </div>

            <p>{review}</p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductReviewCard;
