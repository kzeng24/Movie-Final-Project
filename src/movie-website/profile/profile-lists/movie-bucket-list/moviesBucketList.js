import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../../index.css";
import MovieBucketListItem from "./moviesBucketListItem";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfileByUsernameThunk } from "../../../services/auth-thunks";

function MoviesBucketList() {
  const { currentUser } = useSelector((state) => state.user);
  const [profileUser, setProfileUser] = useState(null);
  const savedMovies = profileUser?.savedMovies;
  const dispatch = useDispatch();
  const location = useLocation();
  let { username } = useParams();

  useEffect(() => {
    const loadProfileUser = async () => {
      if (location.pathname.endsWith("/profile") || location.pathname.endsWith(`/profile/${currentUser.username}`)) {
        setProfileUser(currentUser);
      } else if (username && username !== currentUser.username) {
        const { payload } = await dispatch(fetchProfileByUsernameThunk(username));
        setProfileUser(payload);
      }
    }
    loadProfileUser();
  }, [username, location.pathname, currentUser]);

  return (
    <div>
      <ul className="wd-profile-list list-group w-100">
        <h3>Saved Movies List</h3>
        <br />
        {savedMovies?.map((movie) => (
          <li>
            <MovieBucketListItem movieInfo={movie} key={movie.id}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MoviesBucketList;
