import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import ReceipeCard from "../components/ReceipeCard";
import { GetUserID } from "../hooks/useGetUserID";

const Home = () => {
  const [data, setData] = useState([]);
  const [receipe, setReceipe] = useState([]);
  const userId = GetUserID();

  useEffect(() => {
    const fetchReceipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/receipes`);
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/receipes/savedreceipes/ids/${userId}`
        );
        setReceipe(response.data.savedRecipes);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReceipe();
    fetchSavedRecipe();
  }, []);

  return (
    <div className="">
      <h1 className="text-center text-4xl font-bold text-indigo-500 mt-4 uppercase">
        Recipes
      </h1>
      {data.map((item, indx) => (
        <ReceipeCard
          key={indx}
          item={item}
          setReceipe={setReceipe}
          receipe={receipe}
        />
      ))}
    </div>
  );
};

export default Home;
