import React, { useRef } from "react";
import MyNav from "../../nav-components/nav";
import VideoBackground from "./video/video-background";
import HomeCarousel from "./carousel/carousel";
import HomeSearch from "./search/search";
import { useSelector } from "react-redux";
import SearchInput from "../search/searchInput";
function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const topMoviesRef = useRef(null);

  return (
    <div style={{ "overflow-x": "hidden" }}>
      {currentUser ? (
        <MyNav
          options={{
            homePage: true,
            search: true,
            signIn: false,
            profile: true,
            signOut: true,
          }}
        />
      ) : (
        <MyNav
          options={{
            homePage: true,
            search: true,
            signIn: true,
            profile: false,
            signOut: false,
          }}
        />
      )}

      <VideoBackground topMovieRef={topMoviesRef} />
      <HomeCarousel ref={topMoviesRef} />
      <HomeSearch />
    </div>
  );
}

export default Home;
