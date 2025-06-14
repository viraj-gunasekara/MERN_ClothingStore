import MainCarousel from '../../components/homeCarousel/MainCarousel'
import HomeSectionCarousel from '../../components/homeSectionCarousel/HomeSectionCarousel'
import { mens_kurta } from "../../../productsData/mens_kurta";

const HomePage = () => {
  return (
    <div>
      <MainCarousel/>

      <div className="space-y-10 py-20">
        <HomeSectionCarousel data={mens_kurta} sectionName={"Men's Kurta"}/>
        <HomeSectionCarousel data={mens_kurta} sectionName={"Men's Shoes"}/>
        <HomeSectionCarousel data={mens_kurta} sectionName={"Men's Shirt"}/>
        <HomeSectionCarousel data={mens_kurta} sectionName={"Women's Saree"}/>
        <HomeSectionCarousel data={mens_kurta} sectionName={"Women's Dress"}/>
      </div>
    </div>
  )
}

export default HomePage