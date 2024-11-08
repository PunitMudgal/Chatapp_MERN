import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

import avatar from "../assets/profile.png";
import logo from "../assets/chat.png";
import { registerUser } from "../helper/helper";
import styles from "../styles/register.module.css";
import convertToBase64 from "../helper/base64Convert";

function Register() {
  const navigate = useNavigate();
  const [file, setFile] = useState();

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      picturePath: "",
    },

    // validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, action) => {
      values = await Object.assign(values, { picturePath: file || "" });
      let registerPromise = registerUser(values);

      toast.promise(registerPromise, {
        loading: "Creating Account...",
        success: "Registered!",
        error: "Couldn't Register!",
      });

      const response = await registerPromise;
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/home");
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

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
            <h3 className="text-center text-xl font-semibold text-rose-400 ">
              Register Now
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
              <label
                htmlFor="profile"
                className="flex relative rounded-full overflow-hidden justify-center self-center max-w-fit items-center"
              >
                <img
                  src={file || avatar}
                  className={styles.profile_img}
                  alt="avatar"
                />
                {file && (
                  <p
                    onClick={() => setFile()}
                    className="absolute bottom-0 cursor-pointer bg-gray-500/40 py-3 w-full text-xs font-semibold bg-opacity-55 text-center text-white hover:bg-gray-950/45"
                  >
                    Remove
                  </p>
                )}
              </label>
              <input
                // value={values.picturePath}
                onChange={onUpload}
                onBlur={handleBlur}
                type="file"
                name="picturePath"
                id="profile"
                style={{ display: "none" }}
              />
              <TextField
                label="Name"
                value={values.firstName}
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                required
              />
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
                className="p-2 max-w-fit rounded-2xl self-center text-white bg-amber-400 hover:bg-amber-500"
              >
                Register
              </button>
            </Box>
            <p className="text-sm self-start">
              already have an account?{" "}
              <Link to="/" className="underline text-red-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
