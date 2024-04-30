import { useQuery } from '@tanstack/react-query';
import { getStates } from '@/libs/get';


export const useGetStates = () => {
    const {data: states} = useQuery({
      queryFn: () => getStates(),
      queryKey: ['states']
    })
 
    return { states };
};


