import React from "react";
import TraderProfile from "./traderprofile";

function TraderProfileComponent (props) {
  return (
    <>
      <TraderProfile isLogin={props.isLogin} />
    </>
  );
}

export default TraderProfileComponent ;
