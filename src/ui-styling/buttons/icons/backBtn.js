import React from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import "../../index.css";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";

// redirects to previous parent page
function BackBtn() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}

      className="square rounded-circle wd-pinkBackground wd-circleBtn wd-whiteText"
    >
      <MdOutlineArrowBackIos size={25} />
    </button>
  );
}

export default BackBtn;