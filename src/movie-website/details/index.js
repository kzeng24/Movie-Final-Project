import React from "react";
import MyNav from "../../nav-components/nav";
import MovieListItem from "./movie-info/index";
import ReviewSection from "./reviews/reviewSection";
import { useSelector } from "react-redux";
import MovieClipSection from "./movie-clip";
import Cast from "./cast";
import AudienceList from "./audience-reviews/audience-list";
import BackBar from "../../nav-components/backBar";

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
      <Cast />
      <MovieClipSection />
      <AudienceList />
      <ReviewSection />
      <BackBar />
    </div>
  );
}

export default Details;
