import { useState } from "react"; //rafce for arrow fuction short cut
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      console.log(`data.error ${data.error}`);
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("user-data"); // Remove user-data from loacal storge
      setAuthUser(null);
    } catch (error) {
      console.log(`error.error ${error.message}`);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout }; //{} will be available when we use useLogout() hook.
};

export default useLogout;
