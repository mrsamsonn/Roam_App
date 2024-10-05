"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Restaurant = {
  id: string;
  name: string;
  location: {
    address1: string;
  };
  rating: number; // Add rating to the Restaurant type
};

const Results = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    // Get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation([latitude, longitude]);
      }, (error) => {
        console.error("Geolocation error:", error);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!currentLocation) return;

      const apiKey = process.env.NEXT_PUBLIC_YELP_API_KEY;
      const config = {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        params: {
          term: 'restaurants',
          latitude: currentLocation[0],
          longitude: currentLocation[1],
        },
      };

      try {
        const response = await axios.get(
          'https://api.yelp.com/v3/businesses/search',
          config
        );
        setRestaurants(response.data.businesses);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, [currentLocation]);

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating); // Full stars
    const hasHalfStar = rating % 1 >= 0.5; // Check for half star
    const totalStars = 5; // Total stars to show

    return (
      <div className="flex space-x-1">
        {[...Array(fullStars)].map((_, index) => (
          <span key={index} className="text-yellow-500">★</span>
        ))}
        {hasHalfStar && (
          <span className="text-yellow-500">☆</span>
        )}
        {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
          <span key={index + fullStars + (hasHalfStar ? 1 : 0)} className="text-gray-300">★</span>
        ))}
      </div>
    );
  };

  return (
    <div className="flex border w-full h-full p-4 bg-gray-50">
      <div>
        <h2 className="font-bold text-xl mb-4">Restaurants Near You:</h2>
        {restaurants.length ? (
          <ul className="space-y-4">
            {restaurants.map((restaurant) => (
              <li
                className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                key={restaurant.id}
              >
                <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                <div className="text-gray-600 text-sm">{restaurant.location.address1}</div>
                <div className="mt-2">
                  <strong>Rating:</strong> {renderStars(restaurant.rating)} {restaurant.rating.toFixed(1)}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Results;
