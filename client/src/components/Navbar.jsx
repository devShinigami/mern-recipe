import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const Logout = () => {
    alert("Logged out");
    setCookies("access_token", "");
    window.localStorage.removeItem("userId");
  };

  return (
    <header className="text-white bg-black ">
      <div className="flex flex-row p-3 lg:p-5 md:flex-row items-center">
        <a className="flex title-font font-medium items-center md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Chef</span>
        </a>
        <nav className=" mr-auto ml-4 py-1 border-gray-400 pl-4 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <Link to={"/"} className="mr-5 hover:text-gray-200">
            Home
          </Link>
          {cookies.access_token && (
            <Link to={"/savedreceipes"} className="mr-5 hover:text-gray-200">
              Saved Recipes
            </Link>
          )}

          <Link to={"/createreceipe"} className="mr-5 hover:text-gray-200">
            Create Your Recipe
          </Link>
        </nav>

        {cookies.access_token ? (
          <button
            onClick={Logout}
            className="inline-flex items-center bg-indigo-500 border-0 py-1 px-3  hover:bg-indigo-600 rounded text-base md:mt-0 "
          >
            Logout
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 ml-1 "
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        ) : (
          <Link to={"/auth"}>
            <button className="inline-flex items-center bg-indigo-500  border-0 py-1 px-3  hover:bg-indigo-600 rounded text-base mt-4 md:mt-0 ">
              Login
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-4 h-4 ml-1 "
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}
export default Navbar;
