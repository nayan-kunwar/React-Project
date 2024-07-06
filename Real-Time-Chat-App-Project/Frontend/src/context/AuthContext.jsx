import { createContext, useContext, useState } from "react";

//Step1: Creating Context 
export const AuthContext = createContext();

//Creating hook for accessing the value of provider.
export const useAuthContext = () => {
  return useContext(AuthContext); // {authUser, setAuthUser} == useContext(AuthContext) 
};

//Step2:Create a provider for your context which is AuthContext. 
//AuthContext child will be rencderd in place of {children}
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("user-data")) || null // authUser = {_id: "6682fc4bc39bf32a2b927c70", fullName: "Aman ", userName: "aman07",…}
  ); //Accessing user data from local storage.  JSON.parse will convert "{}" to {}. 
  console.log(
    `authUser data from local storeage and converted to json string to object.`
  );
  return <AuthContext.Provider value={{authUser, setAuthUser}}>{children}</AuthContext.Provider>;
};

//Step3: wrap App component with AuthContextProvider.