import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../Css/Navbar.css";
import listenForOutsideClicks from "./ListenForQutsideClicks";

const Navbar = ({ groupBy, setgroupBy, orderBy, setOrderBy }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (isOpen) => {
    
    setIsOpen(!isOpen);
  };

  const handleGroupBy = (e) => {
    setgroupBy(e.target.value);
  };
  const handleOrderBy = (e) => {
    setOrderBy(e.target.value);
  };

  const menuRef = useRef(null);
  const [listening, setListening] = useState(false);
  useEffect(
    listenForOutsideClicks(listening, setListening, menuRef, setIsOpen)
  );

  return (
    <>
      <div className="navbar-main-container">
        <div className="navbar-wrapper">
          <div ref={menuRef}>
            <div className="select-option">
              <div className="select-icon"></div>
              <div className="selected">Display</div>
              <div
                className="arrow"
                onClick={() => {
                 
                  toggle(isOpen);
                }}
              ></div>
            </div>

            {isOpen ? (
              <div className="option-box">
                <div className="group-by">
                  <div>Grouping</div>
                  <select
                    className="group-by-select"
                    value={groupBy}
                    onChange={handleGroupBy}
                    id=""
                  >
                    <option value="status">Status</option>
                    <option value="priority">Priority</option>

                    <option value="user">User</option>
                  </select>
                </div>
                <div className="order-by">
                  <div>Ordering </div>
                  <select
                    className="order-by-select"
                    value={orderBy}
                    onChange={handleOrderBy}
                    id=""
                  >
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
