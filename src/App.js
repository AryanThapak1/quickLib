import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Root from "./Components/Root";
import Profile from "./Components/Profile";
import HomePage from "./Components/Homepage";
import Signup from "./Components/SignUp";
import Login from "./Components/Login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "Home",
          element: <HomePage />,
        },
        {
          path: "Login",
          element: <Login />,
        },
        {
          path: "Signup",
          element: <Signup />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
