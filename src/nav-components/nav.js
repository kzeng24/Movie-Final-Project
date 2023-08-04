import React from "react";
import "../ui-styling/index.css"
import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProfileBtn from "../ui-styling/buttons/icons/profileBtn";
import SearchBtn from "../ui-styling/buttons/icons/searchBtn";
import WhiteTextBtn from "../ui-styling/buttons/text/whiteTextBtn";
import { useDispatch } from "react-redux";
import { logoutThunk } from "../movie-website/services/auth-thunks";
import HomeBtn from "../ui-styling/buttons/icons/homeBtn";
import { removeUserFromLocalStorage } from "../movie-website/reducers/auth-reducer";
import { useNavigate } from "react-router";

function MyNav({
  options = {
    homePage: false,
    search: true,
    signIn: true,
    profile: false,
    signOut: false,
  },
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const actionResult = await dispatch(logoutThunk());
      if (logoutThunk.fulfilled.match(actionResult)) {
        dispatch(removeUserFromLocalStorage());
        navigate("/login");
      } else {
        throw new Error(actionResult.error.message);
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Navbar >
      <Nav className="container-fluid ps-5 pe-5">
        <Nav.Item>
          <Navbar.Brand as={Link} to="/home">
            <h2 className="d-inline wd-purpleText">CineScope</h2>
          </Navbar.Brand>
        </Nav.Item>
        <Navbar.Collapse className="justify-content-end">
          {options.homePage ? (
            ""
          ) : (
            <Nav.Item>
              <Nav.Link as={Link} to={"/home"}>
                <HomeBtn />
              </Nav.Link>
            </Nav.Item>
          )}
          {options.search ? (
            <Nav.Item>
              <SearchBtn />
            </Nav.Item>
          ) : (
            ""
          )}
          {options.profile ? (
            <Nav.Item>
              <Nav.Link as={Link} to={`/profile`}>
                <ProfileBtn />
              </Nav.Link>
            </Nav.Item>
          ) : (
            ""
          )}
          {options.signIn ? (
            <Nav.Item>
              <Nav.Link as={Link} to="/login">
                <WhiteTextBtn text={"Sign In"} />
              </Nav.Link>
            </Nav.Item>
          ) : (
            ""
          )}
          {options.signOut ? (
            <Nav.Item>
              <Nav.Link as={Link} to="/home">
                <WhiteTextBtn text={"Sign Out"} fn={handleLogout} />
              </Nav.Link>
            </Nav.Item>
          ) : (
            ""
          )}
        </Navbar.Collapse>
      </Nav>
    </Navbar>
  );
}
export default MyNav;
