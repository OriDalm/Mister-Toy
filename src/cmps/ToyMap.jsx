import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { useState } from 'react'

const DOTS = 1
const positions = [
  { lat: 32.0853, lng: 34.7818 },
  { lat: 32.434, lng: 34.9197 },
  { lat: 32.0132, lng: 34.748 },
]
export function ToyMap() {
  const [map, setMap] = useState()

  return (
    <LoadScript id='script-loader' googleMapsApiKey='API_KEY'>
      <div className='App-map' style={{ height: '400px', width: '100%' }}>
        <GoogleMap
          options={{
            disableDefaultUI: true,
            gestureHandling: 'greedy',
          }}
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={{ lat: 32.0853, lng: 34.7818 }}
          zoom={10}
          onLoad={(map) => {
            setMap(map)
          }}
        >
          {positions.map((position, index) => (
            <Marker key={index} position={position} onClick={() => map && map.setCenter(position)} />
          ))}
        </GoogleMap>
      </div>
    </LoadScript>
  )
}
