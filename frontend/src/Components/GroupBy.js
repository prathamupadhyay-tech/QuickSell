import React, { useState } from "react";
import Card from "./Card";
import backlog from "../imgs/loading.png";
import inprogress from "../imgs/Partial.png";
import todo from "../imgs/record.png";
import done from "../imgs/check.png";
import anoopsharma from "../imgs/anoopsharma.png";
import shankarkumar from "../imgs/shankarkumar.jpg";
import ramesh from "../imgs/ramesh.jpg";
import suresh from "../imgs/suresh.png";
import yogesh from "../imgs/yogesh.png";

import cancel from "../imgs/cancel.png";
import { useEffect } from "react";
import "../Css/GroupBy.css";
import priority0 from "../imgs/priority-0.png";
import priority1 from "../imgs/priority-1.png";
import priority2 from "../imgs/priority-2.png";
import priority3 from "../imgs/priority-3.png";
import priority4 from "../imgs/priority-4.png";

const GroupBy = ({ tickets, groupBy, orderBy, users }) => {
  const [updatedFilteredTickets, setUpdatedFilteredTickets] = useState([]);

  const userIcons = {
    anoopsharma: anoopsharma,
    shankarkumar: shankarkumar,
    ramesh: ramesh,
    suresh: suresh,
    yogesh: yogesh,
  };

  const user = users.map((user) => ({
    ...user,
    icon: userIcons[user.name.toLowerCase().split(" ").join("")],
  }));

  const status = [
    {
      icon: backlog,
      name: "backlog",
    },
    {
      icon: inprogress,
      name: "inprogress",
    },
    {
      icon: todo,
      name: "todo",
    },
    {
      icon: done,
      name: "done",
    },
    {
      icon: cancel,
      name: "canceled",
    },
  ];

  const priority = [
    {
      icon: priority4,
      name: "Urgent",
      number: 4,
    },
    {
      icon: priority3,
      name: "High",
      number: 3,
    },
    {
      icon: priority2,
      name: "Medium",
      number: 2,
    },
    {
      icon: priority1,
      name: "Low",
      number: 1,
    },
    {
      icon: priority0,
      name: "No Priority",
      number: 0,
    },
  ];

  const getUserAvailability = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.available : false;
  };

  const updateFilteredTickets = () => {
    switch (groupBy) {
      case "priority":
        const updatedFilteredPriority = priority.map((priorityItem) => ({
          ...priorityItem,
          tickets: tickets
            .filter((ticket) => ticket.priority === priorityItem.number)
            .sort((a, b) => {
              if (orderBy === "title") {
                return a.title.localeCompare(b.title);
              }
              return 0;
            }),
        }));
        setUpdatedFilteredTickets(updatedFilteredPriority);
        break;
      case "status":
        const updatedFilteredStatus = status.map((statusItem) => ({
          ...statusItem,
          tickets: tickets
            .filter(
              (ticket) =>
                ticket.status.toLowerCase().split(" ").join("") ===
                statusItem.name
            )
            .sort((a, b) => {
              if (orderBy === "priority") {
                return b.priority - a.priority;
              } else if (orderBy === "title") {
                return a.title.localeCompare(b.title);
              }
              return 0;
            }),
        }));
        setUpdatedFilteredTickets(updatedFilteredStatus);
        break;
      case "user":
        const updatedFilteredUsers = user.map((userItem) => ({
          ...userItem,
          tickets: tickets
            .filter((ticket) => ticket.userId === userItem.id)
            .sort((a, b) => {
              if (orderBy === "priority") {
                return b.priority - a.priority;
              } else if (orderBy === "title") {
                return a.title.localeCompare(b.title);
              }
              return 0;
            }),
        }));
        setUpdatedFilteredTickets(updatedFilteredUsers);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    updateFilteredTickets();
  }, [groupBy, tickets, orderBy]);

  return (
    <>
      <div className="main-group-conatainer">
        <div className="group-wrapper">
          <>
            <div className="main-container">
              {updatedFilteredTickets.map((data, index) => {
                return (
                  <>
                    <div key={index} className="group-cards-main-div">
                      <div className="headings">
                        <div className="group-section-div">
                          <div className="group-icons-div">
                            <img
                              className="group-icons"
                              src={data.icon}
                              alt=""
                            />

                            {groupBy === "user" && (
                              <div
                                className={`availability ${
                                  data.available ? "available" : ""
                                } `}
                              ></div>
                            )}
                          </div>
                          <div className="names">{data.name}</div>
                        </div>
                        <div className="data-options-div">
                          <div className="add-data"></div>
                          <div className="data-options"></div>
                        </div>
                      </div>
                      {data.tickets.map((ticket, index) => (
                        <Card
                          key={index}
                          groupBy={groupBy}
                          cardId={ticket.id}
                          cardTitle={ticket.title}
                          tag={ticket.tag}
                          status={ticket.status}
                          priority={ticket.priority}
                          user={user}
                          usersId={ticket.userId}
                        />
                      ))}
                    </div>
                  </>
                );
              })}
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default GroupBy;
