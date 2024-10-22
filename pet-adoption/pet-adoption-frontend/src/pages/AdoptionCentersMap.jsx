import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';

// Container style for the map
const containerStyle = {
  width: '100%',
  height: '100%',
};

// Default center for the map (in case geolocation is not available)
const defaultCenter = {
  lat: 51.1657, // Latitude for Germany
  lng: 10.4515, // Longitude for Germany
};

const AdoptionCentersMap = () => {
  const [center, setCenter] = useState(defaultCenter); // Center of the map
  const [markers, setMarkers] = useState([]); // Markers for adoption centers
  const [loading, setLoading] = useState(false); // Loading state
  const [hoveredMarker, setHoveredMarker] = useState(null); // State for hovered marker
  const navigate = useNavigate(); // Initialize useNavigate

  // Use the useLoadScript hook to handle script loading
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Replace with your API key
    libraries: ['places'], // Load the Places library
  });

  // Function to find adoption centers using the Google Places API
  const handleFindAdoptionCenters = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCenter({ lat, lng });

        setLoading(true);

        // Use Google Places API to find nearby adoption centers
        const map = new window.google.maps.Map(document.createElement('div'));
        const service = new window.google.maps.places.PlacesService(map);

        const request = {
          location: { lat, lng },
          radius: '5000', // 50 km radius
          keyword: 'tierheim',
        };

        service.nearbySearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const newMarkers = results.map((place) => ({
              position: place.geometry.location,
              name: place.name,
              address: place.vicinity, // Get the vicinity (address) of the place
              phone: place.formatted_phone_number || 'N/A', // Get phone number if available
              website: place.website || 'N/A', // Get website if available
              id: place.place_id, // Store place_id for navigation
            }));
            setMarkers(newMarkers);
          } else {
            alert('No adoption centers found nearby.');
          }
          setLoading(false);
        });
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleMarkerClick = (markerId) => {
    // Navigate to the tierheim's details page using the place_id
    navigate(`/tierheim/${markerId}`);
  };

  // Show loading message if the Google Maps script hasn't loaded yet
  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return (
    <section className="bg-yellow-200 py-12">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-2xl font-bold">Adoption Centers Near You</h3>
        <div className="h-64 mt-6 rounded-lg overflow-hidden">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={marker.position}
                onMouseOver={() => setHoveredMarker(marker)}
                onMouseOut={() => setHoveredMarker(null)}
                onClick={() => handleMarkerClick(marker.id)} // Handle marker click
              />
            ))}
            {/* Display info for hovered marker */}
            {hoveredMarker && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  background: 'white',
                  padding: '10px',
                  borderRadius: '5px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                }}
              >
                <h4>{hoveredMarker.name}</h4>
                <p>{hoveredMarker.address}</p>
                <p>Phone: {hoveredMarker.phone}</p>
                <p>
                  Website: <a href={hoveredMarker.website} target="_blank" rel="noopener noreferrer">{hoveredMarker.website}</a>
                </p>
              </div>
            )}
          </GoogleMap>
        </div>
        <button
          onClick={handleFindAdoptionCenters}
          className="btn btn-success mt-4"
          disabled={loading}
        >
          {loading ? 'Finding centers...' : 'Find Out Now!'}
        </button>
      </div>
    </section>
  );
};

export default AdoptionCentersMap;
