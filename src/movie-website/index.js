import { Routes, Route, Navigate } from "react-router";
import Profile from "./profile/index";
import Search from "./search/index";
import Home from "./home/index";
import Details from "./details/index";
import Login from "./login/index";
import ScrollToTop from "./scroll-to-top";
import CurrentUserProfile from "./profile/logged-in-profile/currUserProfile";

function MovieWebsite() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* <Route path="/" element={<Navigate to="/home" />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<CurrentUserProfile />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default MovieWebsite;