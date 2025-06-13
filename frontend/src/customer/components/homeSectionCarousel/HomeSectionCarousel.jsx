import React from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../homeSectionCard/HomeSectionCard";

const HomeSectionCarousel = () => {
  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5.5 },
  };

  const items = [1, 1, 1, 1, 1].map((item) => <HomeSectionCard />);

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 ">
      <div className="relative border p-5">
        <AliceCarousel
        mouseTracking
        items={items}
        infinite
        disableButtonsControls
        responsive={responsive}
      />
      </div>
    </div>
  );
};

export default HomeSectionCarousel;
