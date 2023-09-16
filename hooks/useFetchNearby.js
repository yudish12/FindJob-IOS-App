import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchNearby = (lat, long) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const locationOptions = {
    method: "GET",
    url: "https://geocodeapi.p.rapidapi.com/GetNearestCities",
    params: {
      latitude: lat,
      longitude: long,
      range: "0",
    },
    headers: {
      "X-RapidAPI-Key": process.env.EXPO_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": "geocodeapi.p.rapidapi.com",
    },
  };

  const getJobByCity = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(locationOptions);
      const options = {
        method: "GET",
        url: `https://jsearch.p.rapidapi.com/search`,
        params: { query: `Software Developers in ${response.data[0].City}` },
        headers: {
          "X-RapidAPI-Key": process.env.EXPO_PUBLIC_RAPID_API_KEY,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      };
      const jobData = await axios.request(options);
      setData(jobData.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getJobByCity();
  }, []);

  const refetch = () => {
    console.log(process.env.EXPO_PUBLIC_RAPID_API_KEY, 123);
    setIsLoading(true);
    getJobByCity();
  };
  return { data, isLoading, error, refetch };
};
