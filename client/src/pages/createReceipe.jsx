import axios from "axios";
import React, { useState } from "react";
import { GetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function CreateReceipe() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const userId = GetUserID();
  const [receipe, setReceipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    image: "",
    cookingTime: 0,
    user: userId,
  });

  const handleFunc = (e) => {
    const { name, value } = e.target;
    setReceipe({
      ...receipe,
      [name]: value,
    });
  };

  const addIngredients = () => {
    setReceipe({
      ...receipe,
      ingredients: [...receipe.ingredients, ""],
    });
  };
  const handleIngChange = (e, indx) => {
    const { value } = e.target;
    const ingredients = receipe.ingredients;
    ingredients[indx] = value;
    setReceipe({
      ...receipe,
      ingredients,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/receipes`, receipe, {
        headers: {
          authorization: cookies.access_token,
        },
      });
      alert("Receipe Created Successfully");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(userId);

  const navigate = useNavigate();

  return (
    <>
      {cookies.access_token ? (
        <div className="">
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">
              <h1 className="text-center text-2xl font-bold text-indigo-500 sm:text-3xl">
                Create your Recipe
              </h1>

              <form
                className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                onSubmit={onSubmit}
              >
                <div>
                  <label htmlFor="name" className="sr-only">
                    recipe Name
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter Recipe Name"
                      name="name"
                      onChange={handleFunc}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="instructions" className="sr-only">
                    instructions
                  </label>

                  <div className="relative">
                    <textarea
                      type="text"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Insrtuctions"
                      name="instructions"
                      onChange={handleFunc}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      name="cookingTime"
                      onChange={handleFunc}
                      required
                      placeholder="Cooking time"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Image Url"
                      name="image"
                      required
                      onChange={handleFunc}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <button
                    type="button"
                    className="block w-full rounded-lg bg-indigo-500 px-5 py-3 text-sm font-medium text-white"
                    onClick={addIngredients}
                  >
                    Add Ingrendients
                  </button>
                  {receipe.ingredients.map((ing, indx) => (
                    <div key={indx}>
                      <input
                        type="text"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder={indx + 1 + ".item"}
                        value={ing}
                        required
                        name="ingredients"
                        onChange={(e) => handleIngChange(e, indx)}
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="block w-full rounded-lg bg-indigo-500 px-5 py-3 text-sm font-medium text-white"
                >
                  Create Receipe
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <button
            onClick={() => {
              navigate("/auth");
            }}
            className="bg-indigo-500 border-0 py-1 px-3  hover:bg-indigo-600 rounded text-white md:mt-0"
          >
            Login first
          </button>
        </div>
      )}
    </>
  );
}

export default CreateReceipe;
