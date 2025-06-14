import React from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../homeSectionCard/HomeSectionCard";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const HomeSectionCarousel = () => {
  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5.5 },
  };

  const items = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item) => <HomeSectionCard />);

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 ">
      <div className="relative border p-5">
        <AliceCarousel
          mouseTracking
          items={items}
          infinite
          disableButtonsControls
          disableDotsControls
          responsive={responsive}
        />
        <Button
          variant="contained"
          className="z-50 bg-[]"
          sx={{
            position: "absolute",
            top: "8rem",
            right: "0rem",
            transform: "translateX(50%) rotate(90deg)",
          }}
          color="white"
          aria-label="next"
        >
          <ArrowForwardIosIcon
            className=""
            sx={{ transform: "rotate(-90deg)" }}
          />
        </Button>

        <Button
          variant="contained"
          className="z-50 bg-[]"
          sx={{
            position: "absolute",
            top: "8rem",
            left: "0rem",
            transform: "translateX(-50%) rotate(90deg)",
          }}
          color="white"
          aria-label="next"
        >
          <ArrowForwardIosIcon
            className=""
            sx={{ transform: "rotate(90deg)" }}
          />
        </Button>
      </div>
    </div>
  );
};

export default HomeSectionCarousel;
