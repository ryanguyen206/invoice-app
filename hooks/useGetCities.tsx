import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCities } from '@/libs/get';



export const useGetCities = (stateCode: string = 'US-AL', toStateCode: string = 'US-AL') => {
  
  const queryClient = useQueryClient();

  const { data: cities } = useQuery({
    queryKey:['cities', 'from'],
    queryFn: () => getCities(stateCode)
  })

  const { data: toCities } = useQuery({
    queryKey:['cities', 'to'],
    queryFn: () => getCities(toStateCode)
  })

  const refetchCities = async (stateCode: string, where: 'from' | 'to') => {
    try {
      await queryClient.prefetchQuery({
        queryKey: ['cities', where],
        queryFn: async () => {
          const cities = await getCities(stateCode);
          console.log(cities);
          return cities; 
        }
      });
    } catch (error) {
      console.error("Error prefetching cities:", error);
    }
  };

  return { cities, toCities, refetchCities };
};