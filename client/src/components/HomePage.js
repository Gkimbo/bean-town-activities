import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = (props) => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await fetch("/api/v1/categories");
      if (!response.status) {
        const error = new Error(`${response.status} (${response.statusText})`);
        throw error;
      }
      const responseData = await response.json();
      setCategories(responseData.categories);
    } catch (error) {
      console.error("Error in fetch!");
      console.error(error.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const listOfCategories = categories.map((category) => {
    return (
      <Link to={`/categories/${category.id}`}>
        <button className="button category-button">{category.name}</button>
      </Link>
    );
  });

  return (
    <div className="text-center">
      <h2 className="text-center">Explore</h2>
      <div className="categories-list align-center">{listOfCategories}</div>
      <div className=" activity-container grid-x">
        <p className="text-center activity-tile">
      Lorem ipsum dolor sit amet. A omnis possimus ut magni ipsa et sint quam et facere reiciendis. Eos nostrum obcaecati rem quibusdam consequatur est reiciendis nobis sed amet quia. Et galisum sint eos saepe error et architecto nihil 33 quod harum ea laudantium voluptatem aut obcaecati dicta. Aut quaerat rerum rem possimus reiciendis est quia sint ea quas architecto eos rerum nihil.

Ut rerum eligendi At quia explicabo ad sint dolorem hic debitis dolor qui temporibus obcaecati? Eos voluptatum galisum ea saepe saepe sit unde iste eum corrupti blanditiis et explicabo aliquam. Vel nihil sunt id deserunt tempora a odit laudantium.

        </p>
      </div>
    </div>
  );
};

export default HomePage;