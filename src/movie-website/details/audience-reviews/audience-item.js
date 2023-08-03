import React from "react";
import Rating from "@mui/material/Rating";
import { NavLink } from "react-router-dom";

const AudienceItem = ({ review }) => {
  return (
    <NavLink
      to={review.url}
      className="list-group-item list-group-item-action flex-column align-items-start wd-movie-list-item"
    >
      <div>
        <h3>{review.author}</h3>
        {review.author_details.rating && (
          <Rating
            name="read-only"
            value={review.author_details.rating / 2}
            readOnly
          />
        )}

        <h5>{review.content}</h5>
      </div>
    </NavLink>
  );
};
export default AudienceItem;
