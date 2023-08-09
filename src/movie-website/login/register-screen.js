import React, { useState, useEffect } from "react";
import "../../ui-styling/index.css";
import "./index.css";
import BlackTextBtn from "../../ui-styling/buttons/text/blackTextBtn";
import Banner from "./banner";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../services/auth-thunks";
import { setUser, storeUserInLocalStorage } from "../reducers/auth-reducer";
import Multiselect from 'multiselect-react-dropdown';

const allRoles = [
    { value: 'ADMIN', label: 'Admin' },
    { value: 'CRITIC', label: 'Critic' },
    { value: 'VIEWER', label: 'Viewer' },
];

function RegisterScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState([]);
    const [displayBanner, setDisplayBanner] = useState(false);
    const [success, setSuccess] = useState(false);
    const [previousRole, setPreviousRole] = useState([]);
    const { loadingRegister } = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = async () => {
        try {
            const roles = role.map(r => r.value);
            const actionResult = await dispatch(registerThunk({ username, password, firstName, lastName, email, roles }));
            setDisplayBanner(true);
            if (registerThunk.fulfilled.match(actionResult)) {
                setSuccess(true);
                dispatch(setUser(actionResult.payload));
                dispatch(storeUserInLocalStorage(actionResult.payload));
                navigate(`/profile`);
            } else {
                setSuccess(false);
            }
        } catch (e) {
            alert(e);
        }
    };

    const onSelect = (selectedList, selectedItem) => {
        setPreviousRole(role);
        setRole([...selectedList]);
    }

    const onRemove = (selectedList, removedItem) => {
        setPreviousRole(role);
        setRole([...selectedList]);
    }

    useEffect(() => {
        if (role.length > 2 ||
            (role.find(item => item.value === 'VIEWER') && role.find(item => item.value === 'CRITIC')) ||
            (role.length === 2 && !role.find(item => item.value === 'ADMIN'))) {
            alert('You cannot select Viewer and Critic together!');
            setRole(previousRole);
        }
    }, [role]);

    return (
      <>
        <div className="wd-vline col-6">
          <h4 className="text-center">Create Account</h4>
          <br />
          <div
            id="signUpForm"
            className="wd-margin"
            onChange={() => setDisplayBanner(false)}
          >
            <label htmlFor="usernameRegister" className="mt-2">
              Username
            </label>
            <br />
            <input
              className="form-control"
              id="usernameRegister"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <label htmlFor="passwordRegister" className="mt-2">
              Password
            </label>
            <br />
            <input
              className="form-control"
              id="passwordRegister"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <label htmlFor="firstNameRegister" className="mt-2">
              First Name
            </label>
            <br />
            <input
              id="firstNameRegister"
              type="text"
              className="form-control"
              onChange={(event) => setFirstName(event.target.value)}
            />
            <label htmlFor="lastNameRegister" className="mt-2">
              Last Name
            </label>
            <br />
            <input
              id="lastNameRegister"
              type="text"
              className="form-control"
              onChange={(event) => setLastName(event.target.value)}
            />
            <label htmlFor="emailRegister" className="mt-2">
              Email
            </label>
            <br />
            <input
              id="emailRegister"
              type="email"
              className="form-control"
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="role" className="mt-2">
              Role
            </label>
            <Multiselect
              options={allRoles}
              isObject={true}
              onSelect={onSelect}
              onRemove={onRemove}
              displayValue="label"
              id="role"
              placeholder="Pick your role(s)"
              selectedValues={role}
            />
            <br />
            <BlackTextBtn text="Register" fn={handleRegister} />
            {loadingRegister && (
              <>
                <br />
                <br />
                <div class="spinner-border wd-lightPurpleText" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>

              </>
            )}
          </div>
          <br />

          {displayBanner ? <Banner success={success} /> : ""}
        </div>
      </>
    );
}

export default RegisterScreen;
