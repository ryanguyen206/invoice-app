import { oneState } from '@/libs/get';
import React, {useEffect, useState} from 'react'

export const useGetStates = (stateCode?: string) => {
    const [states, setStates] = useState<oneState[] | undefined>(undefined);

    useEffect(() => {
      const fetchStatesAndCities = async () => {
        try {
          const statesResponse = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/states`);
          const statesData = await statesResponse.json();
          setStates(statesData);
        } catch (error) {
          console.error("Error fetching states and cities:", error);
        }
      };
      fetchStatesAndCities();
    }, []);
  
    return { states };
  };