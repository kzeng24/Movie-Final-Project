import React from "react";
import "../reviews/reviews.css";
import AudienceList from "./audience-list";

function AudienceReviewSection() {

  return (
    <div className="wd-review-div">
      <div className="wd-review-content">
        <div className="col-8">
          <AudienceList/>
        </div>
      </div>
    </div>
  );
}

export default AudienceReviewSection;
