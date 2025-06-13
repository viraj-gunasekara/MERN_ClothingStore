import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { MainCarouselData } from './MainCarouselData';

const MainCarousel = () => {

    const items = MainCarouselData.map((item)=> (
    <img
      className="cursor-pointer"
      src={item.image}
      alt=""
      role="presentation"
    />
  ))

  return (
    <AliceCarousel
        mouseTracking
        items={items}
        autoPlay
        infinite
        autoPlayInterval={4000}
        disableButtonsControls
    />
  )
};

export default MainCarousel