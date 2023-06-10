import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/user/UserApi";
import { useDispatch } from "react-redux";
import { authenticatedUser } from "../features/user/UserSlice";
const Login = () => {
  const [istyleEmail, setIstyleEmail] = useState("icon");
  const [istylepass, setIstylePass] = useState("icon");
  const [email, setEmail] = useState("");
  const [Error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [login, { data, isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(data);
  useEffect(() => {
    if (error?.data) {
      setError(error.data.message);
    }
    if (data?.Token && data?.email) {
      localStorage.setItem("user", JSON.stringify({ ...data }));
      dispatch(authenticatedUser({ ...data }));
      navigate("/todo");
    }
  }, [data, dispatch, navigate, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };
  return (
    <div className=" pt-5 mt-5 ">
      <div className="homebox  mx-auto my-auto row  align-items-center p-5 mt-5">
        <h3 className="text-center align-top fw-bolder">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-5">
            <FontAwesomeIcon icon={faEnvelope} className={`${istyleEmail}`} />
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onFocus={() => setIstyleEmail("icon-click")}
              onBlur={() => setIstyleEmail("icon")}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <label htmlFor="floatingInput" className="fw-bold">
              Email Address
            </label>
          </div>
          <div className="form-floating mb-5">
            <FontAwesomeIcon icon={faKey} className={`${istylepass}`} />
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onFocus={() => setIstylePass("icon-click")}
              onBlur={() => setIstylePass("icon")}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <label htmlFor="floatingPassword" className="fw-bold">
              Password
            </label>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-dark" disabled={isLoading}>
              Login
            </button>
          </div>
          {Error && <div className="text-danger fw-bolder m-1">{Error}</div>}
        </form>
        <div className="text-center text-success fw-bold ">
          <p>Haven't registered yet?</p>
          <Link to="/register" className="btn btn-danger">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
