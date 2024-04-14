import axios from "axios";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {

        const options = {
            method: 'GET',
            url: 'https://referential.p.rapidapi.com/v1/state',
            params: {
              iso_a2: 'us',
              lang: 'en',
              limit: '300'
            },
            headers: {
              'X-RapidAPI-Key': process.env.API_KEY,
              'X-RapidAPI-Host': process.env.API_HOST
            }
          };
    
          const response  = await axios.request(options);
          return Response.json(response.data)
   
}