import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";

const mapContainerStyle = {
  width: "100%",
  height: "200px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
};

const ContactMap = ({ address, lat, lng, isLoaded }) => {
  const [showInfo, setShowInfo] = useState(false);

  if (lat == null || lng == null) return null;

  const position = { lat, lng };

  const shortAddress =
    address?.length > 60 ? address.slice(0, 60) + "..." : address;

  return (
    <div className="mt-1">
      {!isLoaded ? (
        <div className="h-48 flex items-center justify-center bg-gray-100 rounded-lg">
          Loading map...
        </div>
      ) : (
        <GoogleMap mapContainerStyle={mapContainerStyle} center={position} zoom={15}>
          <Marker position={position} onClick={() => setShowInfo(true)}>
            {showInfo && (
              <InfoWindow position={position} onCloseClick={() => setShowInfo(false)}>
                <p className="text-sm text-gray-800">{shortAddress}</p>
              </InfoWindow>
            )}
          </Marker>
        </GoogleMap>
      )}
    </div>
  );
};

export default ContactMap;