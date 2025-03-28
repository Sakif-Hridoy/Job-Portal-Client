import React, { useContext } from "react";
// import { AuthContext } from "../providers/AuthProvider";
import { Link, replace, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Register = () => {
  const { createUser,logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUser(email, password)
      .then((res) => {
        console.log(res.user);
        console.log("User created");
        return logoutUser(),
        navigate("/signin", { replace: true })

      })
    .catch((error) => {
        console.log("error", error);
      });
};
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6 text-center">Register Here with your email</p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleRegister} className="card-body">
            <fieldset className="fieldset">
              <label className="fieldset-label">Name</label>
              <input
                type="text"
                name="name"
                className="input"
                placeholder="Name"
              />
              <label className="fieldset-label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
              />
              <label className="fieldset-label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                name="password"
              />
              <h5 className="">
                Already Registered?{" "}
                <Link className="text-blue-700" to="/signin">
                  Sign In
                </Link>
              </h5>
              <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;