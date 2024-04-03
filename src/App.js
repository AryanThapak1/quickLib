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
import Student from "./Components/Student";
import StudentRegistration from "./Components/StudentRegistration";
import Dashboard from "./Components/Dashboard";
import { loader as Authchecker } from "./utils/AuthChecker";
import ForgotPassword from "./Components/ForgotPassword";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "profile",
          element: <Profile />,
          loader: Authchecker,
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
          path:"Forgot",
          element:<ForgotPassword/>
        },
        {
          path: "Search-Book",
          element: <SearchPage />,
          loader: Authchecker,
        },
        {
          path: "Search-Book/:id",
          element: <BookData />,
          loader: Authchecker,
        },
        {
          path: "/requests",
          element: <Requests />,
          loader: Authchecker,
        },
        {
          path: "/Student",
          element: <Student />,
          loader: Authchecker,
        },
        {
          path: "/StudentRegistration",
          element: <StudentRegistration />,
        },
        {
          path: "/Dashboard",
          element: <Dashboard />,
          loader: Authchecker,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
