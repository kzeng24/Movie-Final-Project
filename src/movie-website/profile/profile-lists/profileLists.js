import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileByUsernameThunk } from "../../services/auth-thunks";

import CriticReviewList from "./critic-review-list/criticReviewList";
import MoviesBucketList from "./movie-bucket-list/moviesBucketList";
import FollowedCriticsList from "./followed-critics-list/followedCriticsList";
import BackBtn from "../../../ui-styling/buttons/icons/backBtn";
import "../index.css"
import { useParams } from "react-router";

function ProfileLists({isCurUser}) {
  const { currentUser } = useSelector((state) => state.user);
  let { username } = useParams();
  if (isCurUser) {
    username = currentUser?.username;
  }
  const [profileUser, setProfileUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProfileUser = async () => {
      const { payload } = await dispatch(fetchProfileByUsernameThunk(username));
      setProfileUser(payload);
    }
    loadProfileUser();
  }, [username, dispatch]);

  return (
    <div className="wd-review-div">
      <div className="wd-review-content">
        {currentUser && (
          <div>
            {profileUser &&
              profileUser.roles &&
              profileUser.roles.includes("VIEWER") && (
                <>
                  <MoviesBucketList />
                  <FollowedCriticsList />
                </>
              )}
            {profileUser &&
              profileUser.roles &&
              profileUser.roles.includes("CRITIC") && <CriticReviewList />}
          </div>
        )}
      </div>
      <br />
      <BackBtn />
    </div>
  );
}

export default ProfileLists;
