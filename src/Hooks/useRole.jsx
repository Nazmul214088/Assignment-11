import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useRole = () => {
  const [role, setRole] = useState();
  const { user } = useAuth();
  const axiosSecure = useAxios();
  useEffect(() => {
    if (!user) return;
    const getRole = async () => {
      const result = await axiosSecure.get(`/users/${user.email}/role`);
      setRole(result.data);
      console.log(role);
    };
    getRole();
  });
  return role;
};

export default useRole;
