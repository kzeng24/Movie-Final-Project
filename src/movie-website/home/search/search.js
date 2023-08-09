import React from "react";
import "./index.css";
import SearchInput from "../../search/searchInput";

function HomeSearch() {
  return (
    <>
      <div className="wd-outer-div">
        <div className="wd-inner-div">
          <SearchInput />
        </div>
      </div>
    </>
  );
}
export default HomeSearch;