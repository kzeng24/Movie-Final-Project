import React, { useState } from "react";
import "../../ui-styling/index.css";
import "./index.css";
import BlackTextBtn from "../../ui-styling/buttons/text/blackTextBtn";
import Banner from "./banner";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../services/auth-thunks";
import { setUser } from "../reducers/auth-reducer";
import { storeUserInLocalStorage } from "../reducers/auth-reducer";

function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [displayBanner, setDisplayBanner] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const { loadingLogin } = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            const actionResult = await dispatch(loginThunk({ username, password }));
            setDisplayBanner(true);
            if (loginThunk.fulfilled.match(actionResult)) {
                setIsValid(true);
                dispatch(setUser(actionResult.payload));
                dispatch(storeUserInLocalStorage(actionResult.payload));
                navigate(`/profile`);
            }
        } catch (e) {
            alert(e);
        }
    };

    return (
      <>
        <div className="col-6">
          <h4 className="text-center">Sign In</h4>
          <br />
          <div
            id="loginForm"
            className="wd-margin"
            onChange={() => setDisplayBanner(false)}
          >
            <label for="usernameLogin" className="mt-2">
              Username
            </label>
            <br />
            <input
              className="form-control"
              id="usernameLogin"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <label for="passwordLogin" className="mt-2">
              Password
            </label>
            <br />
            <input
              className="form-control"
              id="passwordLogin"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <br />
            <BlackTextBtn text={"Sign In"} fn={handleLogin} />
            {loadingLogin && <><br /><br /><p>Loading ...</p></>}
          </div>
          <br />

          {displayBanner ? <Banner success={isValid} /> : ""}
        </div>
      </>
    );
}

export default LoginScreen;
