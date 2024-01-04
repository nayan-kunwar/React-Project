import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

function Github() {
    const data = useLoaderData(); // response.json(); will store to data
    // const [data, setData] = useState([]);
    // useEffect(() => {
    //   fetch("https://api.github.com/users/nayan-kunwar")
    //     .then((response) => response.json())
    //     .then((data) => setData(data));
    // }, []);
    return <div>Github Followers: {data["followers"]}
    <img src={data.avatar_url} alt="profile" />
    </div>;
}

export default Github;

export const gitInfoLoader = async () => {
  const response = await fetch("https://api.github.com/users/nayan-kunwar");
  return response.json();
};
