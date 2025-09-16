'use client'
import {
  useRouter,
  useParams,
  useSearchParams,
  usePathname
} from 'next/navigation'

const PropertyPage = () => {
  //   const router = useRouter()
  const params = useParams()
  //   const searhParams = useSearchParams()
  //   const pathname = usePathname()
  //   console.log(router)
  return (
    <div>
      {/* <button onClick={() => router.replace(`/`)}>Go Home</button> */}
      <h1>Property Page = {params.id}</h1>
      {/* <p> Search Paramas {searhParams.get(`name`)}</p> */}
      {/* <p>pathname {pathname}</p> */}
    </div>
  )
}

export default PropertyPage
