import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const SignIn = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const api_key = import.meta.env.VITE_API_KEY;

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then((res) => {
        console.log(res.user);
        const user = { email: res.user.email };

        axios
          .post("https://job-portal-server-nrz5.onrender.com/jwt", user, {
            withCredentials: true,
            headers: {
              "x-api-key": api_key,
            },
          })
          .then(() => {
            // Show success popup
            Swal.fire({
              title: "Logged In!",
              text: "You have successfully logged in.",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              // Redirect to "from" after clicking OK
              navigate(from, { replace: true });
            });
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold pb-4">Sign In now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSignIn} className="card-body">
            <fieldset className="fieldset">
              <label className="fieldset-label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
                required
              />
              <label className="fieldset-label">Password</label>
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Password"
                required
              />
              <h5 className="">
                Not Registered?{" "}
                <Link className="text-blue-700" to="/register">
                  Register
                </Link>
              </h5>
              <button className="btn btn-neutral mt-4">Sign In</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
