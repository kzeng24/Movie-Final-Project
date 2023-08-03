import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../reviews/reviews.css";
import AudienceItem from "./audience-item";
import { findAudienceReviewsThunk } from "../../services/movies-thunks";
import { useParams } from "react-router-dom";

const AudienceList = () => {
    const { audienceReviews } = useSelector((state) => state.audienceReviews);
    const { loading } = useSelector((state) => state.audienceReviews);
    const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findAudienceReviewsThunk(id));
    console.log(id);
  }, [dispatch, id]);
  return (
    <>
      {!loading && (
        <div className="wd-review-list-div">
          <ul className="list-group wd-review-list">
            <h3>Audience Reviews</h3>
            <br />
            <li>
              {audienceReviews.length > 0 && audienceReviews.map((review) => (
                <AudienceItem key={review._id} review={review} />
              ))}
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
export default AudienceList;
