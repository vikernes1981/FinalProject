import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

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
          radius: '5000', // 5 km radius
          keyword: 'pet adoption center',
        };

        service.nearbySearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const newMarkers = results.map((place) => ({
              position: place.geometry.location,
              name: place.name,
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

  return (
    <section className="bg-yellow-200 py-12">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-2xl font-bold">Adoption Centers Near You</h3>
        <div className="h-64 mt-6 rounded-lg overflow-hidden">
          <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            libraries={['places']}  // Load the Places library
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={12}
            >
              {markers.map((marker, index) => (
                <Marker key={index} position={marker.position} />
              ))}
            </GoogleMap>
          </LoadScript>
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
