import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data) setData(data.data);
        else setData([]);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    getData();
  }, [url]);

  return { data, loading };
};
