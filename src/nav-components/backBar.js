import React from "react";
import BackBtn from "../ui-styling/buttons/icons/backBtn";
import "../ui-styling/index.css";
import "bootstrap/dist/css/bootstrap.css";

const BackBar = () => {
  return (
    <div
      style={{ bottom: "20px" }}
      className={`container-fluid ps-5 pe-5 position-fixed pb-3 pt-3`}
    >
      <BackBtn />
    </div>
  );
};
export default BackBar;
