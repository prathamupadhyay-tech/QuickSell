import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Card from "./Card";
import { GridLoader } from "react-spinners";
import Navbar from "./Navbar";
import "../Css/MainPage.css";
import GroupBy from "./GroupBy";
const MainPage = () => {
  const [groupBy, setgroupBy] = useState("status");
  const [orderBy, setOrderBy] = useState("priority");
  const [tickets, settickets] = useState([]);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    axios
      .get("https://apimocha.com/quicksell/data")
      .then((response) => {
        settickets((prevtickets) => (prevtickets = response.data.tickets));
        setUsers((prevUser) => (prevUser = response.data.users));
      })
      .catch((error) => {
        alert("There is some technical issue please try later");
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
        {users && tickets ? (
          <GroupBy
            tickets={tickets}
            groupBy={groupBy}
            orderBy={orderBy}
            users={users}
          />
        ) : (
          <div className="loader">
            <GridLoader color="#36d7b7" />
          </div>
        )}
      </div>
    </>
  );
};

export default MainPage;
