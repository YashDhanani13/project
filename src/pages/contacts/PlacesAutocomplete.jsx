import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const AddressInput = ({ value, onChange }) => {
  const { suggestions: { data, loading }, setValue } =
    usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = getLatLng(results[0]);
      onChange({ address, lat, lng });
    } catch (err) {
      console.error("Geocode error:", err);
      onChange({ address, lat: null, lng: null });
    }
  };

  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange({ address: e.target.value, lat: null, lng: null });
        }}
        placeholder="Search address…"
        className="w-full font-semibold text-gray-800 bg-transparent outline-none pt-1"
      />

      {(loading || data.length > 0) && (
        <div className="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {loading && (
            <div className="px-4 py-2 text-sm text-gray-400">Loading…</div>
          )}
          {data.map((suggestion) => (
            <div
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion.description)}
              className="flex items-center gap-2 px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-50"
            >
              {suggestion.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressInput;