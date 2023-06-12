import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Todolist from "../components/Todolist";

const Home = () => {
  const { user } = useSelector((state) => state.authUser);

  return (
    <div className="container pt-5">
      {user.name ? (
        <Todolist />
      ) : (
        <div className="text-center">
          <h1>Welcome To TodoList Application</h1>
          <h4 className="p-3 ">
            For using this application please Login or Register to continue...
          </h4>
          <div className="homebox  mx-auto my-auto row  align-items-center p-5 mt-5">
            <div>
              <Link to="/register" className="btn btn-dark col-12 mb-3">
                Register
              </Link>

              <Link to="/login" className="btn btn-dark col-12">
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
