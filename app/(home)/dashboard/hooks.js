import { useCallback, useEffect, useState } from "react";

export const useDashboardPage = () => {
  const [data, setData] = useState([]);

  const getDashboarData = useCallback(async () => {
    const response = await (
      await fetch("https://api.noderent.pro/account/dashboard/nodes", {
        method: "GET",
        credentials: "include",
      })
    ).json();

    if (response.status === "success") {
      setData(Object.values(response.nodes));
    }
  }, []);

  useEffect(() => {
    getDashboarData();
  }, []);

  return { data };
};
