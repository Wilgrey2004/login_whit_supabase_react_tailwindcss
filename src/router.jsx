import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Signin } from "./components/Signin";
import { Signup } from "./components/Signup";
import { DashBoard } from "./components/DashBoard";
import { PrivateRoute } from "./components/PrivateRoute";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/signup", element: <Signup /> },
  { path: "/signin", element: <Signin /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoard />
      </PrivateRoute>
    ),
  },
]);
