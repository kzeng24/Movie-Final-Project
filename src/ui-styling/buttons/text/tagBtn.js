import React from "react";
import "../../index.css";

function TagBtn({ text, fn, selected}) {
  return (
  <button
    className={`wd-whiteBackground  wd-purpleBorder rounded-pill p-2 m-1  ${
      selected ? "wd-selected" : "wd-purpleText"
    }`}
    onClick={() => {
      if (fn) fn();
    }}
  >
    {text}
  </button>
  );
}

export default TagBtn;
