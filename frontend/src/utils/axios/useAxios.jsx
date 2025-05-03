import { useEffect, useState, useCallback } from "react";
import useAxiosAuth from "./useAxiosAuth"

const useAxios = (url) => {
  const axios = useAxiosAuth();
  const [data, setData] = useState([]);

  // Fetching data function
  const fetchData = useCallback(() => {
    if (url) {
      axios
        .get(`/api/${url}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error.response || error.message);
        });
    }
  }, [url, axios]);

  // Fetch data on component mount or when URL changes
  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url, fetchData]);

  // Return data and the refetch function
  return { data, refetch: fetchData };
};

export default useAxios;
