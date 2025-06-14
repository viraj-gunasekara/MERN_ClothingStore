import React, { useRef, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../homeSectionCard/HomeSectionCard";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { mens_kurta } from "../../../productsData/mens_kurta";

const HomeSectionCarousel = () => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5.5 },
  };

  const items = mens_kurta.slice(0,10).map((item, index) => 
  <HomeSectionCard key={index} product={item}/>);

  const handleSlideChange = (e) => {
    setActiveIndex(e.item);
  };

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 ">
      <div className="relative border p-5">
        <AliceCarousel
          ref={carouselRef}
          disableButtonsControls
          disableDotsControls
          mouseTracking
          items={items}
          activeIndex={activeIndex}
          responsive={responsive}
          onSlideChanged={handleSlideChange}
          animationType="fadeout"
        />

        {/* Next button  */}
       {activeIndex < items.length - responsive[1024].items && (
        <Button
          onClick={() => carouselRef.current?.slideNext()}
          variant="contained"
          className="z-50 bg-white"
          sx={{
            position: "absolute",
            top: "8rem",
            right: "0rem",
            transform: "translateX(50%) rotate(90deg)",
            bgcolor: "white",
          }}
          color="white"
          aria-label="next"
        >
          <ArrowForwardIosIcon
            className=""
            sx={{ transform: "rotate(-90deg)" }}
          />
        </Button>
       )}

       {/* Prev button  */}
       {activeIndex > 0 && (
        <Button
          onClick={() => carouselRef.current?.slidePrev()}
          variant="contained"
          className="z-50 bg-white"
          sx={{
            position: "absolute",
            top: "8rem",
            left: "0rem",
            transform: "translateX(-50%) rotate(90deg)",
            bgcolor: "white",
          }}
          color="white"
          aria-label="prev"
        >
          <ArrowForwardIosIcon
            className=""
            sx={{ transform: "rotate(90deg)" }}
          />
        </Button>
       )}
      </div>
    </div>
  );
};

export default HomeSectionCarousel;
