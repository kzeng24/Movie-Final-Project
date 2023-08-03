import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { findMovieReviewsThunk } from "../../services/reviews-thunks";
import "./reviews.css"
import ReviewItem from "./reviewItem";
import { useParams } from "react-router";
const ReviewList = () => {
    const [movieReviews, setMovieReviews] = useState([]);
    let { id } = useParams();

    const dispatch = useDispatch();
    useEffect(() => {
        const loadMovieReviews = async () => {
            const { payload } = await dispatch(findMovieReviewsThunk(id));
            setMovieReviews(payload);
        }
        loadMovieReviews();
    })
    return (
        <div className="wd-review-list-div">
            <ul className="list-group wd-review-list">
                <li >
                    <h3>User Reviews</h3><br />
                </li>
                {
                    movieReviews && movieReviews.map((review) =>
                        <ReviewItem
                            key={review._id}
                            review={review} />
                    )
                }
            </ul>
        </div>
    );
}
export default ReviewList;