import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";

function Profile() {
  const { user } = useContext(UserContext);
  //null is falsy in js
  if (!user) return <div>please login</div>;

  return <div>Welcome {user.username}</div>;
}

export default Profile;
