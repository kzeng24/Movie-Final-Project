import React from "react";
import MyNav from "../../nav-components/nav";
import MovieListItem from "./movie-info";
import ReviewSection from "./reviews/reviewSection";
import { useSelector } from "react-redux";
import MovieClipSection from "./movie-clip";

function Details() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      {currentUser ? (
        <MyNav
          options={{
            homePage: false,
            search: true,
            signIn: false,
            profile: true,
            signOut: true,
          }}
        />
      ) : (
        <MyNav />
      )}
      <MovieListItem />
      <br />
      <MovieClipSection />
      <ReviewSection />
    </div>
  );
}

export default Details;
