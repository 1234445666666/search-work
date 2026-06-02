import { useState, useEffect } from "react";
import type { IVacancies } from "@/features/works/types";
export default function useFetch(arr: IVacancies[]) {
  const [data, setData] = useState<IVacancies[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(arr);
      setLoading(false);
      setError(null);
    }, 1000);
    return () => clearTimeout(timer);
  }, [arr]);

  return { data, loading, error };
}
