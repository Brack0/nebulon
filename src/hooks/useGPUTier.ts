import { getGPUTier } from "detect-gpu";
import { useEffect, useState } from "react";

const useGPUTier = () => {
  const [gpuTier, setGpuTier] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGPUTier().then(({ tier }) => {
      setGpuTier(tier);
      setLoading(false);
    });
  }, [setGpuTier]);

  return { gpuTier, loading };
};

export default useGPUTier;
