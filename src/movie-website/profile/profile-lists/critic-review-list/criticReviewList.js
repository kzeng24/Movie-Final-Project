import React, { useEffect, useState } from "react";
import CriticReviewListItem from "./criticReviewListItem";
import "../../index.css";
import { findCriticReviewsThunk } from "../../../services/reviews-thunks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { fetchProfileByUsernameThunk } from "../../../services/auth-thunks";

function CriticReviewList() {
    const { currentUser } = useSelector((state) => state.user);
    const [criticReviews, setCriticReviews] = useState([]);
    const [profile, setProfile] = useState({});
    let {username} = useParams();
    const dispatch = useDispatch();

    let criticUsername = username ? username : currentUser?.username;

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const actionResult = await dispatch(fetchProfileByUsernameThunk(criticUsername));
                if (actionResult.type.endsWith('fulfilled')) {
                    setProfile(actionResult.payload);
                } else {
                    console.error('Failed to load profile:', actionResult);
                }
            } catch (error) {
                console.error('Error loading profile:', error);
            }
        }
        loadProfile();
    }, [username, dispatch]);

    useEffect(() => {
        const loadCriticReviews = async () => {
            try {
                const actionResult = await dispatch(findCriticReviewsThunk(criticUsername));
                if (actionResult.type.endsWith('fulfilled')) {
                    setCriticReviews(actionResult.payload);
                } else {
                    console.error('Failed to load critic reviews:', actionResult);
                }
            } catch (error) {
                console.error('Error loading critic reviews:', error);
            }
        }
        loadCriticReviews();
    }, [username, dispatch]);


    return (
        <div>
            <ul className="wd-profile-list list-group">
                <li >
                    <h3>{profile.firstName}'s Reviews</h3><br />
                </li>
                {
                    criticReviews.map(review =>
                        <CriticReviewListItem
                            key={review._id}
                            title={review.title}
                            rating={review.rating}
                            description={review.description}
                            movieId={review.movieId} />
                    )
                }
            </ul>
        </div>
    );

}
export default CriticReviewList;
