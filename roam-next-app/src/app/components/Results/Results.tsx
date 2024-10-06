"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Restaurant = {
  id: string;
  name: string;
  location: {
    address1: string;
    city: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  distance: number;
  review_count: number;
};

interface ResultsProps {
  searchTerm: string;
  setRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>;
}

const Results: React.FC<ResultsProps> = ({ searchTerm, setRestaurants }) => {
  const [restaurants, setLocalRestaurants] = useState<Restaurant[]>([]);
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
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
          term: searchTerm || 'restaurants',
          latitude: currentLocation[0],
          longitude: currentLocation[1],
        },
      };

      try {
        const response = await axios.get('https://api.yelp.com/v3/businesses/search', config);

        // Calculate a relevance score based on how closely the restaurant name matches the search term
        const calculateRelevance = (restaurantName: string, searchTerm: string): number => {
          const lowerCaseName = restaurantName.toLowerCase();
          const lowerCaseSearch = searchTerm.toLowerCase();

          if (lowerCaseName.includes(lowerCaseSearch)) {
            // Higher relevance score if the name contains the search term
            return 2;
          } else if (lowerCaseName.split(' ').some(word => word.startsWith(lowerCaseSearch))) {
            // Medium relevance score if some word starts with the search term
            return 1;
          } else {
            return 0;
          }
        };

        const sortedRestaurants = response.data.businesses.sort((a: Restaurant, b: Restaurant) => {
          const relevanceA = calculateRelevance(a.name, searchTerm);
          const relevanceB = calculateRelevance(b.name, searchTerm);

          // Primary sort by relevance, then rating, then review count
          if (relevanceB !== relevanceA) {
            return relevanceB - relevanceA;
          }
          if (b.rating !== a.rating) {
            return b.rating - a.rating;
          }
          return b.review_count - a.review_count;
        });

        setLocalRestaurants(sortedRestaurants);
        setRestaurants(sortedRestaurants);
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
    <div className="flex border w-full h-full p-4 bg-gray-50 overflow-y-scroll">
      <div className="w-full">
        <h2 className="font-bold text-xl mb-4">
          {searchTerm ? `Results for: ${searchTerm}` : "Restaurants Near You:"}
        </h2>
        {restaurants.length ? (
          <ul className="space-y-4">
            {restaurants.map((restaurant) => {
              const distanceInMiles = restaurant.distance * 0.000621371;

              return (
                <li
                  className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                  key={restaurant.id}
                >
                  <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                  <div className="text-gray-600 text-sm">
                    {restaurant.location.address1}, {restaurant.location.city}
                  </div>
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
