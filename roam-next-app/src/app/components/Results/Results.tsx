"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Restaurant = {
  id: string;
  name: string;
  location: {
    address1: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  distance: number; // Add distance to the Restaurant type
  review_count: number; // Add review_count to the Restaurant type
};

interface ResultsProps {
  searchTerm: string; // Define the type for searchTerm
}

const Results: React.FC<ResultsProps> = ({ searchTerm }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    // Get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation([latitude, longitude]);
        console.log("Current Location:", latitude, longitude);
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

      console.log("Fetching restaurants for location:", currentLocation);

      const apiKey = process.env.NEXT_PUBLIC_YELP_API_KEY;
      const config = {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        params: {
          term: searchTerm || 'restaurants',
          latitude: currentLocation[0],
          longitude: currentLocation[1],
        },
      };

      try {
        const response = await axios.get(
          'https://api.yelp.com/v3/businesses/search',
          config
        );
        const sortedRestaurants = response.data.businesses.sort((a: Restaurant, b: Restaurant) => {
          // Sort by rating first, then by number of reviews
          if (b.rating !== a.rating) {
            return b.rating - a.rating; // Higher rating first
          }
          return b.review_count - a.review_count; // Higher review count first
        });
        setRestaurants(sortedRestaurants);
        console.log("Restaurants fetched and sorted:", sortedRestaurants);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, [currentLocation, searchTerm]);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const totalStars = 5;

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
      <div className="w-full">
        <h2 className="font-bold text-xl mb-4">
          {searchTerm ? `Results for: ${searchTerm}` : "Restaurants Near You:"}
        </h2>
        {restaurants.length ? (
          <ul className="space-y-4">
            {restaurants.map((restaurant) => {
              // Convert distance from meters to miles
              const distanceInMiles = restaurant.distance * 0.000621371; 

              console.log(`Distance to ${restaurant.name}:`, distanceInMiles.toFixed(2));

              return (
                <li
                  className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                  key={restaurant.id}
                >
                  <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                  <div className="text-gray-600 text-sm">{restaurant.location.address1}</div>
                  <div className="mt-2">
                    <strong>Distance:</strong> {distanceInMiles.toFixed(2)} miles
                  </div>
                  <div className="mt-2">
                    <strong>Rating:</strong> {renderStars(restaurant.rating)} {restaurant.rating.toFixed(1)} ({restaurant.review_count} reviews)
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Results;
