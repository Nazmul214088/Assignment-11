import axios from "axios";
import { useMemo } from "react";

const useAxios = () => {
  const axiosSecure = useMemo(() => {
    return axios.create({
      baseURL: "http://localhost:5000",
    });
  }, []);

  return axiosSecure;
};

export default useAxios;
