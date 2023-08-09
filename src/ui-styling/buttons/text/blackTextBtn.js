import React from "react";
import "../../index.css";
import "bootstrap/dist/css/bootstrap.css";

function BlackTextBtn({ text, fn }) {
  return (
    <button
      onClick={() => {
        fn();
      }}
      className={`rounded-pill btn btn-outline-dark wd-whiteText wd-blackBackground wd-purpleBorder px-3 wd-padding10 m-1`}
    >
      {text}
    </button>
  );
}

export default BlackTextBtn;

