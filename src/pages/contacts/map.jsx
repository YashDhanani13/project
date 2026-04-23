import React, { useState, useCallback, memo } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '12px',
  border: '1px solid #ddd'
}

const center = {
  lat: 21.1702, // Surat, India coordinates
  lng: 72.8311,
}

function map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    // We pull the key from the .env file
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, 
  })

  const [selected, setSelected] = useState(null)

  if (!isLoaded) return <div>Loading Map...</div>

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
    >
      {/* A Marker shows where the person is located */}
      <Marker 
        position={center} 
        onClick={() => setSelected(center)}
      />

      {/* InfoWindow shows text when you click the marker */}
      {selected   && (
        <InfoWindow
          position={center}
          onCloseClick={() => setSelected(null)}
        >
          <div>
            <h3>Contact Location</h3>
            <p>Main Office - Surat</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  )
}

export default map