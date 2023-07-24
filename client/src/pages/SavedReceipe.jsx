import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { GetUserID } from "../hooks/useGetUserID";
import SavedReceipeCard from "../components/SavedReceipeCard";
const Home = () => {
  const [receipe, setReceipe] = useState([]);
  const userId = GetUserID();

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/receipes/savedreceipes/${userId}`
        );
        setReceipe(response.data.savedReceipes);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSavedRecipe();
  }, []);

  return (
    <div className="">
      <h1 className="text-center text-4xl font-bold text-indigo-500 mt-4 uppercase">
        Saved Recipes
      </h1>
      {receipe?.map((item, indx) => (
        <SavedReceipeCard key={indx} item={item} />
      ))}
    </div>
  );
};

export default Home;
