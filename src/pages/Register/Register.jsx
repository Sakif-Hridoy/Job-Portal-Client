import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Password validation regex
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!passwordRegex.test(password)) {
      setError("Password must be at least 6 characters long, contain one uppercase letter, and one number.");
      return;
    }

    createUser(email, password)
      .then((res) => {
        console.log(res.user);
        console.log("User created");

        // Log out user for security
        logoutUser().then(() => {
          // Show success popup
          Swal.fire({
            title: "Registration Successful!",
            text: "Your account has been created. Please sign in.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            // Redirect to Sign In after popup
            navigate("/signin", { replace: true });
          });
        });
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
                required
              />
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
                className="input"
                placeholder="Password"
                name="password"
                required
              />
              {/* Warning message for invalid password */}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

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
