import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Card from "./Card";
import Navbar from "./Navbar";
import "../Css/MainPage.css";
import GroupBy from "./GroupBy";
const MainPage = () => {
  const [groupBy, setgroupBy] = useState("status");
  const [orderBy, setOrderBy] = useState("priority");
  const [tickets, settickets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const response = axios
      .get("https://apimocha.com/quicksell/data")
      .then((response) => {
        settickets((prevtickets) => (prevtickets = response.data.tickets));
        setUsers((prevUser) => (prevUser = response.data.users));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Navbar
        groupBy={groupBy}
        setgroupBy={setgroupBy}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      ></Navbar>
      
      <div className="mainpage-main-container">
        <GroupBy tickets={tickets} groupBy={groupBy} orderBy={orderBy} users={users} />

      
      </div>
    </>
  );
};

export default MainPage;
