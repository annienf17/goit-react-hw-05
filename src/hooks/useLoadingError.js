import { useState } from "react";

function useLoadingError() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  const setErrorState = (error) => setError(error);
  const clearError = () => setError(null);

  return {
    loading,
    error,
    startLoading,
    stopLoading,
    setErrorState,
    clearError,
  };
}

export default useLoadingError;
