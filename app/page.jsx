import Hero from '@/components/Hero'
import InfoBoxes from '@/components/InfoBoxes'
import HomeProperties from '@/components/HomeProperties'
import FeaturedProperties from '@/components/FeaturedProperties'

const HomePage = () => { 
  return (
    <div> 
      <Hero></Hero>
      <InfoBoxes></InfoBoxes>
      <FeaturedProperties></FeaturedProperties>
      <HomeProperties></HomeProperties>
    </div>
  )
}

export default HomePage
