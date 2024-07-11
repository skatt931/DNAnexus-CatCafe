import React from "react";
import headerImg from "../assets/header_kitten.png";

export default () => (
  <header>
    <div>
      <img src={headerImg} alt="Cat" width="225" id="head-cat" />
    </div>
    <h1>Welcome to Cat Cafe!</h1>
  </header>
);
