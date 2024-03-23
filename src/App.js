import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Root from "./Components/Root";
import Profile from "./Components/Profile";
import HomePage from "./Components/Homepage";
import Signup from "./Components/SignUp";
import Login from "./Components/Login";
import SearchPage from "./Components/SearchPage";
import BookData from "./utils/BookData";
import Requests from "./Components/Requests";

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
        {
          path: "Search-Book",
          element: <SearchPage />,
        },
        {
          path: "Search-Book/:id",
          element: <BookData />,
        },
        {
          path: "/requests",
          element: <Requests />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
