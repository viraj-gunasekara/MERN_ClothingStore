import React from "react";

const HomeSectionCard = () => {
  return (
    <div className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3">
      <div className="h-[13rem] w-[10rem]">
        <img
          className="object-cover object-top w-full h-full"
          src="https://www.ethnicplus.in/media/catalog/product/cache/77b9a44d9276879ccdde931a01149182/2/0/2049pnk_main.jpg"
          alt=""
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">Capricious Blush</h3>
        <p className="mt-2 text-sm text-gray-500">
          Pink Zari Weaving Border Vichitra Silk Half Saree Lehenga
        </p>
      </div>
    </div>
  );
};

export default HomeSectionCard;
