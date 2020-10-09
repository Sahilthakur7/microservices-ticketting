import React from "react";
import axios from "axios";

const Home = ({ currentUser }) => {
  if (currentUser) {
    return <h1>HOME and signed in</h1>;
  } else {
    return <h1>Not signed in home</h1>;
  }
};

Home.getInitialProps = async () => {
  const res = await axios.get("/api/users/current-user");

  return res.data;
};

export default Home;
