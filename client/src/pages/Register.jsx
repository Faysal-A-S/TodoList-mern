import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../features/user/UserApi";
import { useDispatch } from "react-redux";
import { authenticatedUser } from "../features/user/UserSlice";

const Register = () => {
  const [istyleEmail, setIstyleEmail] = useState("icon");
  const [istylepass, setIstylePass] = useState("icon");
  const [istyleName, setIstyleName] = useState("icon");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [register, { data, isLoading, error }] = useRegisterMutation();
  const [Error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await register({ name, email, password });
  };
  useEffect(() => {
    if (error?.data) {
      setError(error.data.message);
    }
    if (data?.Token && data?.email) {
      localStorage.setItem("user", JSON.stringify({ ...data }));
      dispatch(authenticatedUser({ ...data }));
      navigate("/todo");
    }
  }, [error, data, dispatch, navigate]);
  return (
    <div className=" pt-5 mt-5 ">
      <div className="homebox  mx-auto my-auto row  align-items-center p-5 mt-5">
        <h3 className="text-center align-top fw-bolder">Register</h3>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <FontAwesomeIcon icon={faUser} className={`${istyleName}`} />
            <input
              type="text"
              className="form-control"
              id="floatingEmail"
              placeholder="Name"
              onFocus={() => setIstyleName("icon-click")}
              onBlur={() => setIstyleName("icon")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="floatingEmail" className="fw-bold">
              Name
            </label>
          </div>
          <div className="form-floating mb-3">
            <FontAwesomeIcon icon={faEnvelope} className={`${istyleEmail}`} />
            <input
              type="email"
              className="form-control"
              id="floatingPass"
              placeholder="Email"
              onFocus={() => setIstyleEmail("icon-click")}
              onBlur={() => setIstyleEmail("icon")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="floatingPass" className="fw-bold">
              Email Address
            </label>
          </div>
          <div className="form-floating mb-3">
            <FontAwesomeIcon icon={faKey} className={`${istylepass}`} />
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onFocus={() => setIstylePass("icon-click")}
              onBlur={() => setIstylePass("icon")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="floatingPassword" className="fw-bold">
              Password
            </label>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-dark" disabled={isLoading}>
              Register
            </button>
          </div>
          {Error && <div className="text-danger fw-bolder m-1">{Error}</div>}
        </form>
        <div className="text-center text-success fw-bold ">
          <p>Already have an account?</p>
          <Link to="/login" className="btn btn-danger">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
