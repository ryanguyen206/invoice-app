import { cityAPIResponse, oneState } from '@/libs/get';
import React, {useEffect, useState} from 'react'

export const useGetCities = (stateCode?: string) => {
    const [cities, setCities] = useState<cityAPIResponse[] | undefined>(undefined);


    const fetchCities = async () => {
        try {
          const citiesResponse = await fetch(`/api/cities?stateCode=${stateCode}`);
          const citiesData = await citiesResponse.json();
          setCities(citiesData);
        } catch (error) {
          console.error("Error fetching states and cities:", error);
        }
      };
      fetchCities();
  
  
    return { fetchCities, cities };
  };