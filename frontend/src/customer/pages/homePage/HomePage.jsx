import MainCarousel from "../../components/homeCarousel/MainCarousel";
import HomeSectionCarousel from "../../components/homeSectionCarousel/HomeSectionCarousel";
import { useDispatch, useSelector } from "react-redux";
import { findProducts } from "../../../redux/customer/product/Action";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { customerProducts } = useSelector((store) => store);

  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");

  console.log("Products Home::", customerProducts);

  const allProducts = customerProducts?.products?.content || [];

  const menProducts = allProducts.filter(
    (p) =>
      p.category?.parentCategory?.parentCategory?.name?.toLowerCase() === "men"
  );

  const womenProducts = allProducts.filter(
    (p) =>
      p.category?.parentCategory?.parentCategory?.name?.toLowerCase() ===
      "women"
  );

  const kidsProducts = allProducts.filter(
    (p) =>
      p.category?.parentCategory?.parentCategory?.name?.toLowerCase() === "kids"
  );

  // Sort by creation date for most recent
  const recentProducts = [...allProducts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  useEffect(() => {
    const data = {
      category: category || "",
      colors: [],
      sizes: [],
      minPrice: "",
      maxPrice: "",
      minDiscount: "",
      sort: "",
      pageNumber: "",
      pageSize: "100",
      stock: "",
    };
    dispatch(findProducts(data));
  }, [dispatch, category]);

  return (
    <div>
      <MainCarousel />

      <div className="space-y-10 py-2">
        <div className="space-y-10">
          <HomeSectionCarousel
            data={recentProducts}
            sectionName={"New Arrivals"}
          />
          <HomeSectionCarousel data={menProducts} sectionName={"Men's Wear"} />
          <HomeSectionCarousel
            data={womenProducts}
            sectionName={"Women's Wear"}
          />
          <HomeSectionCarousel data={kidsProducts} sectionName={"Kids' Wear"} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
