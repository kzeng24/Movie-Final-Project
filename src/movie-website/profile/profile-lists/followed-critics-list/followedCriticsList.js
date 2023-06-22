import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../../index.css";
import FollowedCriticsListItem from "./followedCriticsListItem";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfileByUsernameThunk } from "../../../services/auth-thunks";

function FollowedCriticsList() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  let { urlUsername } = useParams();
  const [followedCritics, setFollowedCritics] = useState([]);

  useEffect(() => {
    const loadFollowedCritics = async () => {
      if (location.pathname.endsWith("/profile") || location.pathname.endsWith(`/profile/${currentUser.username}`)) {
        setFollowedCritics(currentUser?.followedCritics);
      } else if (urlUsername && urlUsername !== currentUser.username) {
        const { payload } = await dispatch(fetchProfileByUsernameThunk(urlUsername));
        setFollowedCritics(payload.followedCritics);
      }
    }
    loadFollowedCritics();
  }, [location.pathname, urlUsername, currentUser]);

  return (
    <>
      <ul className="wd-profile-list list-group">
        <li>
          <h3>Followed Critics</h3>
          <br />
        </li>
        {followedCritics.map((critic) => (
          <FollowedCriticsListItem critic={critic}/>
        ))}
      </ul>
    </>
  );
}

export default FollowedCriticsList;
