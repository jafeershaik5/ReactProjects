import { useEffect, useState } from "react";

export function useFetch(url: string) {
  const [data, setData] = useState<object>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  const fetchData = async (url: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response is not Ok");
      }
      const data = await response.json();
      setData(data);
    } catch (error: any) {
      setError(error.message || "Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, [url]);
  return { data, isLoading, error };
}
