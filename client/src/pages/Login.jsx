import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styles from "../styles/register.module.css";
import { useFormik } from "formik";
import logo from "../assets/chat.png";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../helper/helper";
import { Toaster, toast } from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    // validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, action) => {
      let loginPromise = loginUser(values);

      toast.promise(loginPromise, {
        loading: "Logging in...",
        success: "Login Success!",
        error: "Couldn't Login!",
      });

      loginPromise.then(function (res) {
        let { token } = res.data;
        localStorage.setItem("token", token);
        navigate("/home");
        action.resetForm();
      });
    },
  });

  return (
    <>
      <div className={`${styles.full_register}`}>
        <div className="p-5 md:p-0">
          <Toaster position="top-center" reverseOrder={false}></Toaster>
          {/* app logo  */}
          <div className="flex flex-col justify-center items-center ">
            <img src={logo} alt="app_logo" className="h-52 w-52" />
            <h2 className="text-white font-semibold font-text text-3xl">
              CHIT-CHAT
            </h2>
          </div>

          <div className={styles.registerBox}>
            <h2 className="text-3xl text-emerald-600">Welcome Back User</h2>
            <h3 className="text-center text-xl text-rose-400 font-semibold">
              Login
            </h3>
            <Box
              onSubmit={handleSubmit}
              className="flex flex-col md:p-2"
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "40ch" },
              }}
              noValidate
              autoComplete="on"
            >
              <TextField
                label="Email Address"
                value={values.firstName}
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                required
              />
              <TextField
                label="Password"
                value={values.firstName}
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                type="password"
                required
              />
              <button
                type="submit"
                className="p-2 px-4 max-w-fit rounded-2xl self-center bg-amber-400 hover:bg-amber-500 text-white"
              >
                Login
              </button>
            </Box>
            <p className="text-sm self-start">
              Don't have any account?{" "}
              <Link to="/register" className="underline text-red-500">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
