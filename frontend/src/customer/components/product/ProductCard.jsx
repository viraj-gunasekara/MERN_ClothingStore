import React from 'react'
import "./ProductCard.css"

const ProductCard = () => {
  return (
    <div className='productCard w-[15rem] border m-3 transition-all cursor-pointer'>
      <div className='h-[20rem]'>
        <img className='h-full w-full object-cover object-left-top' 
        src="https://img.freepik.com/free-photo/elegant-young-handsome-man_1301-5870.jpg?ga=GA1.1.210513954.1749497838&semt=ais_hybrid&w=740" alt="" />
      </div>

      <div className='textPart bg-white p-3 '>
        <div>
          {/* brand */}
          <p className='font-bold opacity-60'>
            Gorgeous Rani
          </p>
          {/* title */}
          <p>
            Pink Georgette Wedding Wear Plain Gown With Dupatta
          </p>
          {/* color */}
          <p className='font-semibold opacity-50'>
            White
          </p>
        </div>

        <div className='flex space-x-2 items-center'>
          <p className='font-semibold'>Rs. 2500</p>
          <p className='opacity-50 line-through'>Rs. 2950</p>
          <p className='text-green-600 font-semibold'> 12 % off</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard