import axios from "axios";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams.get("stateCode")
        const options = {
            method: 'GET',
            url: 'https://referential.p.rapidapi.com/v1/city',
            params: {
              fields: 'iso_a2,state_code,state_hasc,timezone,timezone_offset',
              iso_a2: 'us',
              lang: 'en',
              state_code: searchParams,
              limit: '1000'
            },
            headers: {
              'X-RapidAPI-Key': process.env.API_KEY,
              'X-RapidAPI-Host': process.env.API_HOST
            }
          };
    
          const response  = await axios.request(options);
          return Response.json(response.data)
   
}