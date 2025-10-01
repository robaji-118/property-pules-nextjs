'use client'
import { useEffect, useState } from 'react'
import Map, { Marker } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import Image from 'next/image'
import pin from '@/assets/images/pin.svg'
import Spinner from './Spinner'

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [loading, setLoading] = useState(true)
  const [geocodeError, setGeocodeError] = useState(false)
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: '100%',
    height: '500px'
  })

  useEffect(() => {
    console.log('Property:', property)
    if (!property || !property.location) return

    const fetchCoords = async () => {
      try {
        const query = `${property.location.street} ${property.location.city} ${property.location.zipcode}`
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            query
          )}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`
        )
        const data = await res.json()

        if (!data.features || data.features.length === 0) {
          setGeocodeError(true)
          return
        }

        const [lng, lat] = data.features[0].center
        setLat(lat)
        setLng(lng)
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng
        })
      } catch (error) {
        console.error(error)
        setGeocodeError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchCoords()
  }, [property])

  if (loading) return <Spinner></Spinner>   

  if (geocodeError)
    return <div className='text-xl'> No location data found</div>

  return (
    !loading &&(
    <Map mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
        mapLib={import('mapbox-gl')}
        initialViewState={{
            longitude: lng,
            latitude: lat,
            zoom:15
        }}

        style={{width: '100%', height : 500}}
        mapStyle={"mapbox://styles/mapbox/streets-v9"}
    >
        <Marker longitude={lng} latitude={lat} anchor='bottom'>
            <Image src={pin} alt='location' width={40} height={40}>

            </Image>
        </Marker>
    </Map>
    )
  )
}

export default PropertyMap
