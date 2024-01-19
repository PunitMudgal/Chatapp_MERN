import {
  InfoRounded,
  AlternateEmailRounded,
  EventRounded,
} from "@mui/icons-material";
import { useState } from "react";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";

import avatar from "../assets/profile.png";
import { editUserData } from "../helper/helper";
import convertToBase64 from "../helper/base64Convert";
import { UseUserContext } from "../context/UserContext";
import { LoadingProfile } from "./Loading";

function Profile({ setMenuItem }) {
  const [isEdit, setIsEdit] = useState(false);
  const [file, setFile] = useState();
  const { user, isUserDataLoading, fetchUserData } = UseUserContext();

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: user?.name,
      picturePath: user?.picturePath,
      aboutUser: user?.aboutUser,
    },

    // validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, action) => {
      values = await Object.assign(values, { picturePath: file || "" });
      let registerPromise = editUserData(values);

      toast.promise(registerPromise, {
        loading: "Updating...",
        success: "Update Success",
        error: "Couldn't Update!",
      });
      registerPromise.then(() => {
        fetchUserData();
        setIsEdit(false);
      });
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  if (isUserDataLoading) return <LoadingProfile />;
  return (
    <div className="h-screen overflow-auto px-4">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex gap-2 items-cener justify-between p-2 text-gray-200 mb-3">
        {/* back button  */}
        <svg
          onClick={() => setMenuItem("")}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-9 h-9 hover:bg-gray-700 p-2 rounded-full cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <p>Profile</p>

        {/* edit button */}
        <svg
          onClick={() => setIsEdit(true)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 cursor-pointer "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </div>

      <div className="flex flex-col gap-6 text-gray-300">
        {/* photo  */}
        {isEdit ? (
          <>
            <label
              htmlFor="profile"
              className="flex relative rounded-full overflow-hidden justify-center self-center max-w-fit cursor-pointer mb-3"
            >
              <img
                src={file || values?.picturePath || avatar}
                className="object-cover border-2 border-red-600 w-[150px] h-[150px] rounded-full shadow-lg"
                alt="avatar"
              />
              {file ? (
                <p
                  onClick={() => setFile()}
                  className="absolute bottom-0 cursor-pointer bg-gray-500/40 py-3 w-full text-xs font-semibold bg-opacity-55 text-center text-white hover:bg-gray-950/45"
                >
                  Remove
                </p>
              ) : (
                <p className="absolute bottom-0 cursor-pointer bg-gray-500/40 py-3 w-full text-xs font-semibold bg-opacity-55 text-center text-white hover:bg-gray-950/45">
                  Change
                </p>
              )}
            </label>{" "}
            <input
              onChange={onUpload}
              onBlur={handleBlur}
              type="file"
              name="picturePath"
              id="profile"
              style={{ display: "none" }}
            />
          </>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <img
              src={user?.picturePath || avatar}
              alt="user_img"
              className="object-cover border-2 border-gray-600 w-[150px] h-[150px] rounded-full shadow-lg mb-3"
            />

            {/* NAME */}
            <p className="font-semibold  ">{user?.name}</p>
            <span className="text-sky-500 text-xs">online</span>
          </div>
        )}

        {isEdit && (
          <input
            name="name"
            value={values.name}
            placeholder="name"
            onChange={handleChange}
            className="bg-transparent self-center border-b-2 p-1 text-sm"
          />
        )}

        <div className="flex flex-col gap-3">
          {/* email */}
          <div className="flex flex-col">
            <span className="text-xs text-start ml-10 text-gray-500">
              Email
            </span>
            <p className="p-2">
              <AlternateEmailRounded /> {user?.email}{" "}
            </p>
          </div>

          {/* Joined date */}
          <div>
            <span className="text-xs ml-10 text-gray-500">Joined at</span>
            <p className="p-2">
              <EventRounded /> {user?.createdAt.slice(0, 10)}
            </p>
          </div>

          {/* bio  */}
          <div>
            <span className="text-xs ml-10 text-gray-500">Bio</span>
            {isEdit ? (
              <input
                value={values.aboutUser}
                name="aboutUser"
                placeholder="Add Bio"
                onChange={handleChange}
                className="bg-transparent border-b-2 p-1 self-start text-sm"
              />
            ) : (
              <p className="p-2">
                <InfoRounded /> {user?.aboutUser || "N/A"}
              </p>
            )}
          </div>
        </div>

        {/* BUTTONS  */}
        {isEdit && (
          <div className="mt-4 flex flex-col gap-1">
            <button
              className="border-2 border-purple-400 rounded p-2 hover:bg-purple-500 text-white w-full"
              type="submit"
              onClick={handleSubmit}
            >
              Update
            </button>
            <button
              onClick={() => setIsEdit(false)}
              className="p-2 self-center w-fit hover:underline"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
