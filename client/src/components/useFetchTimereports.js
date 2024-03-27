import { useState, useEffect } from "react";
import axios from "axios";

function useFetchTimereports(projectId, filterByUser) {
  const [timereports, setTimereports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimereports = async () => {
      setIsLoading(true);
      try {
        const params = { project_id: projectId };
        if (filterByUser !== undefined) {
          params.filter_by_user = filterByUser ? "true" : "false";
        }
        const response = await axios.get("/api/timereports", { params });

        if (response.status === 401) {
          throw new Error("Unauthorized");
        }
        setTimereports(response.data);
      } catch (error) {
        console.error("Error fetching timereports:", error);
        setError("Failed to fetch timereports");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimereports();
  }, [projectId, filterByUser]);

  return { timereports, isLoading, error };
}

export default useFetchTimereports;
