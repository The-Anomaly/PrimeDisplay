import React, { useState } from "react";

import "./Avatardesign.css";

const Avatardesign = (props: any) => {
  const theme_val = localStorage.getItem("avatar_theme");
  const theme = theme_val ? JSON.parse(theme_val) : 3;
  return (
    <>
      {/* <div className="avatar-container">
        <div className="avatar-circle ">
          <div className="avatar-inner-circle">
            <div className="initials">
              <h1 className="initials-heading">JJ</h1>
            </div>
          </div>
        </div>
      </div> */}
      <div
        className={
          theme === 1
            ? "avatar-outter avatar-red"
            : theme === 2
            ? "avatar-outter avatar-blue"
            : "avatar-outter avatar-green"
        }
      >
        <h1>{props.initial}</h1>
      </div>
    </>
  );
};

export default Avatardesign;
