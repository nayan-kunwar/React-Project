import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
const useLogin = () => {
  const [loading, setLoading] = useState();
  const { setAuthUser } = useAuthContext();
  const login = async (username, password) => {
    const success = handleInputErrors(username, password);

    if (!success) return;

    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error); // Will come from server.
      }

      localStorage.setItem("user-data", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      console.log(`catch error.message ${error.message}`);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!username || !password ) {
    toast.error("Please fill all the fields");
    return false;
  }
  return true;
}