import React from "react";
import {
  Routes,
  Route,
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Suspense, lazy } from "react";

import ProtectedRoute from "./helper/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Signin = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Contacts = lazy(() => import("./components/Contacts"));
const Profile = lazy(() => import("./components/Profile"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Signin />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "",
          element: <Contacts />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
  ]);

  return (
    <>
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
