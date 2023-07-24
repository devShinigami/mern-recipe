import React, { useEffect, useState } from "react";
import { GetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { useCookies } from "react-cookie";

function ReceipeCard({ item, setReceipe, receipe }) {
  const userId = GetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [error, setError] = useState(false);
  const saveRecipe = async (receipeId) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/receipes`,
        {
          receipeId,
          userId,
        },
        {
          headers: {
            authorization: cookies.access_token,
          },
        }
      );

      setReceipe(response.data.savedReceipes);

      console.log(response.data);
    } catch (err) {
      if (err.response.data.message === "No token provided") {
        setError(true);
      }
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col justify-center m-6">
      <div className="md:w-2/4 relative flex-col md:flex-row md:space-x-5 space-y-3 px-4 md:space-y-0 rounded-xl shadow-lg max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
        <div className="">
          <img
            src={item?.image}
            alt="tailwind logo"
            className="rounded-xl object-cover md:w-full md:h-96 h-64"
          />
        </div>
        <div className="w-full md:w-full bg-white flex flex-col p-3">
          <h3 className="font-black text-gray-800 md:text-3xl text-xl">
            {item?.name}
          </h3>
          <h1 className="text-md">Ingredients</h1>
          <div className="flex flex-wrap item-center">
            {item?.ingredients?.map((ing, indx) => (
              <p className="text-black font-medium md:block pr-2">
                {ing + ","}
              </p>
            ))}

            <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 md:block">
              {"Cooking Time: " + item?.cookingTime + " minutes"}
            </div>
          </div>
          <h1 className="font-bold mt-2">Instructions:</h1>

          <p className="md:text-lg text-gray-500 text-base py-2">
            {item?.instructions}
          </p>

          {receipe?.includes(item?._id) ? (
            <p>Already Saved</p>
          ) : (
            <button
              onClick={() => {
                saveRecipe(item?._id);
              }}
              className="bg-indigo-500 text-white rounded-lg py-2 px-4 hover:bg-indigo-600 my-4"
            >
              {error
                ? "To save the recipe you must be login first"
                : "Save Recipe"}
            </button>
          )} 
        </div>
      </div>
    </div>
  );
}

export default ReceipeCard;
