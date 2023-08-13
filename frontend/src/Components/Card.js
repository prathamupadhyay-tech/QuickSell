import React from "react";
import img1 from "../imgs/Avatar.png";
import backlog from "../imgs/loading.png";
import inprogress from "../imgs/Partial.png";
import todo from "../imgs/record.png";
import done from "../imgs/check.png";
import priority0 from "../imgs/priority-0.png";
import priority1 from "../imgs/priority-1.png";
import priority2 from "../imgs/priority-2.png";
import priority3 from "../imgs/priority-3.png";
import priority4 from "../imgs/priority-4.png";
import "../Css/Card.css";
const imageMapping = {
  backlog: backlog,
  inprogress: inprogress,
  todo: todo,
  done: done,
};

const priorityMapping = [priority0, priority1, priority2, priority3, priority4];
const Card = ({
  groupBy,
  cardId,
  cardTitle,
  tag,
  status,
  priority,
  user,
  usersId,
}) => {
  const stat = status.toLowerCase().split(" ").join("");

  const imageUrl = imageMapping[stat];

  const getUserAvailability = (userId) => {
    const users = user.find((user) => user.id === userId);
    return users;
  };
  return (
    <>
      <div className="main-card-container">
        <div className="id-container">
          <p className="card-id">{cardId}</p>
          {groupBy !== "user" && (
            <div className="card-owner">
              <img className="owner-avatar" src={getUserAvailability(usersId).icon} alt="" />
              <div
                className={`availability ${
                  getUserAvailability(usersId).available ? "available" : ""
                }`}
              ></div>
            </div>
          )}
        </div>
        <div className="title-container">
          {groupBy !== "status" && (
            <div className="title-icon-div">
              <img className="title-icon" src={imageUrl} alt="" />
            </div>
          )}

          <div className="title-div">
            <p className="card-title">{cardTitle}</p>
          </div>
        </div>
        <div className="tag-container">
          {groupBy !== "priority" && (
            <div className="tag-icon-div">
              <img src={priorityMapping[priority]} className="tag-icon"></img>
            </div>
          )}

          <div className="tag-name">
            <div className="tag-circle"></div>
            {tag.map((data, index) => {
              return (
                <div key={index} className="tag-title">
                  {data}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
