import React, { useEffect, useState } from "react";

function ReceipeCard({ item }) {
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
        </div>
      </div>
    </div>
  );
}

export default ReceipeCard;
