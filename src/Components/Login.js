import { Link, useNavigate } from "react-router-dom";
import image from "./../Items/QuickLib logo1.png";
import sideImage from "./../Items/Mobile login-amico.png";
import Input from "../utils/Input";
import { useRef, useState } from "react";
import BASE_URL from "../utils/Constant";
export default function Login() {
  const [wrongPassword, setWrongPassword] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef();
  const PasswordRef = useRef();

  const onSubmitHandler = async (event) => {
    setWrongPassword(false);
    event.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: PasswordRef.current.value,
    };

    const response = await fetch(`${BASE_URL}/api/v1/user/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });


    if (!response.ok) {
      setWrongPassword(true);
      return;
    }

    const processedData=await response.json();
    const token=processedData.token;
    const role=processedData.role;
    sessionStorage.setItem('token',token);
    sessionStorage.setItem('role',role);

    setTimeout(() => {
      navigate("/Profile");
    });
  };
  return (
    <>
      <div className="flex">
        <div className="w-[50%] hidden md:block">
          <img src={sideImage} alt='illustration'/>
        </div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src={image}
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={onSubmitHandler}>
              <Input
                htmlFor="Email"
                labelClasses="block text-sm font-medium leading-6 text-gray-900"
                inputClasses="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="email"
                ref={emailRef}
              />

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <Link
                      to="Forgot"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ref={PasswordRef}
                  />
                </div>
              </div>
              {wrongPassword && (
                <p className="text-red-600">Wrong email or password</p>
              )}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link
                to="/Signup"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
