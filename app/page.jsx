import Hero from '@/components/Hero'
import InfoBoxes from '@/components/InfoBoxes'
import HomeProperties from '@/components/HomeProperties'
import connectDB from '@/config/database'

const HomePage = async () => { 
  await connectDB() 
  return (
    <div>
      <Hero></Hero>
      <InfoBoxes></InfoBoxes>
      <HomeProperties></HomeProperties>
    </div>
  )
}

export default HomePage
