import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TierheimDetails = () => {
  const { placeId } = useParams(); // Get the placeId from the URL
  const [placeDetails, setPlaceDetails] = useState(null);

  useEffect(() => {
    // Function to fetch place details using Google Places API
    const fetchPlaceDetails = async () => {
      try {
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        const request = {
          placeId: placeId,
          fields: ['name', 'formatted_phone_number', 'formatted_address', 'photos', 'website', 'rating'],
        };

        service.getDetails(request, (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setPlaceDetails(place);
          } else {
            console.error('Error fetching place details:', status);
          }
        });
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    };

    fetchPlaceDetails();
  }, [placeId]);

  if (!placeDetails) return <div>Loading place details...</div>;

  return (
    <div className="container text-white">
      <h1>{placeDetails.name}</h1>
      <p>Address: {placeDetails.formatted_address}</p>
      <p>Phone: {placeDetails.formatted_phone_number || 'N/A'}</p>
      <p>Rating: {placeDetails.rating || 'No ratings available'}</p>
      <p>
        Website: {placeDetails.website ? <a href={placeDetails.website} target="_blank" rel="noopener noreferrer">{placeDetails.website}</a> : 'No website available'}
      </p>
      {placeDetails.photos && (
        <img
          src={placeDetails.photos[0].getUrl({ maxWidth: 400, maxHeight: 300 })}
          alt={placeDetails.name}
        />
      )}
    </div>
  );
};

export default TierheimDetails;
