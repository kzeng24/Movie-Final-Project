import React from "react";
import "../../index.css";
import {Link} from "react-router-dom";
import {FaUserCircle} from "react-icons/fa";
import { useSelector } from "react-redux";
import DeleteBtn from "../../../../ui-styling/buttons/icons/deleteBtn";
import { useDispatch } from "react-redux";
import { updateUserThunk } from "../../../services/auth-thunks";
import { useLocation } from "react-router-dom";

function FollowedCriticsListItem({critic}) {
   const { currentUser } = useSelector((state) => state.user);
   const followedCritics = currentUser?.followedCritics;
   const location = useLocation();

   const dispatch = useDispatch();

   const handleUnFollow = async (e) => {
      const newFollowingList = followedCritics.filter(
        (followed) => followed._id !== critic._id
      );
      const updatedViewer = {
        ...currentUser,
        followedCritics: newFollowingList,
      };
      dispatch(updateUserThunk(updatedViewer));
      e.preventDefault();
      alert("Unfollowed this critic");
    };

    return (
      <Link
        to={{ pathname: `/profile/${critic.username}` }}
        className="list-group-item list-group-item-action flex-column align-items-start wd-movie-list-item"
      >
        {
          (location.pathname.endsWith("/profile") || location.pathname.endsWith(`/profile/${currentUser.username}`)) &&
          <DeleteBtn
            fn={(e) => handleUnFollow(e)}
            className={"float-end"}
          />
        }
        <div className="row p-3 wd-movie-list-row">
          <div className="col-3 wd-movie-list-image d-none d-lg-block">
            <FaUserCircle size={50} className="float-left mr-3" />
          </div>
          <div className="col-9 wd-movie-list-info d-none d-lg-block">
            <h5>@{critic.username}</h5>
            <h4>
              {critic.firstName} {critic.lastName}
            </h4>
          </div>
          <div className="d-lg-none col-12">
            <FaUserCircle size={50} className="float-left mr-3 " />
            <h5>@{critic.username}</h5>
            <h4>
              {critic.firstName} {critic.lastName}
            </h4>
          </div>
        </div>
      </Link>
    );
};

export default FollowedCriticsListItem;