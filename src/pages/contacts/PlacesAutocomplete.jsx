import { useEffect, useRef, useState } from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";

const AddressInput = ({ value, onChange }) => {
  const [inputVal, setInputVal] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);
  const sessionTokenRef = useRef(null);

  // ✅ sync external value
  useEffect(() => {
    setInputVal(value || "");
  }, [value]);

  const fetchSuggestions = async (input) => {
    if (!input || input.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);

      // ✅ NEW API: AutocompleteSuggestion replaces AutocompleteService
      if (!sessionTokenRef.current) {
        sessionTokenRef.current =
          new window.google.maps.places.AutocompleteSessionToken();
      }

      const request = {
        input,
        sessionToken: sessionTokenRef.current,
      };

      const { suggestions: results } =
        await window.google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
          request
        );

      setSuggestions(results || []);
    } catch (err) {
      console.error("Autocomplete error:", err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setInputVal(val);
    onChange({ address: val, lat: null, lng: null });

    // ✅ debounce
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 300);
  };

  const handleSelect = async (suggestion) => {
    const address = suggestion.placePrediction.text.toString();

    setInputVal(address);
    setSuggestions([]);

    // ✅ reset session token after selection
    sessionTokenRef.current = null;

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = getLatLng(results[0]);
      onChange({ address, lat, lng });
    } catch {
      onChange({ address, lat: null, lng: null });
    }
  };

  return (
    <div className="relative">
      <input
        value={inputVal}
        onChange={handleChange}
        placeholder="Search address..."
        className="w-full bg-transparent text-white outline-none"
      />

      {(loading || suggestions.length > 0) && (
        <div className="absolute z-50 w-full bg-white text-black rounded shadow">
          {loading && <div className="p-2">Loading...</div>}

          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onMouseDown={() => handleSelect(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {suggestion.placePrediction.text.toString()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressInput;
