import { GoogleMap, Marker } from "@react-google-maps/api";

// ─── Google Maps config ────────────────────────────────────────────────────────
const mapContainerStyle = {
  width: "100%",
  height: "200px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
};

// ─── ContactMap (view mode) ────────────────────────────────────────────────────
// Shows a small Google Map pinned to the contact's address coordinates.
// Falls back gracefully if coords are missing.
const ContactMap = ({ address, lat, lng, isLoaded }) => {
  if (!lat || !lng) return null;

  const position = { lat, lng };

  return (
    <div className="mt-1">
      {!isLoaded ? (
        <div className="h-48 flex items-center justify-center bg-gray-100 rounded-lg">
          Loading map...
        </div>
      ) : (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={position}
          zoom={15}
        >
          <Marker position={position} title={address} />
        </GoogleMap>
      )}
    </div>
  );
};

export default ContactMap;