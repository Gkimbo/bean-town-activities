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
      <li className="btn-1">
        <Link to={`/categories/${category.id}`}>{category.name}</Link>
      </li>
    );
  });

  return (
    <div className="text-center">
      <h2 className="text-center">Explore</h2>
      <div className="categories-list align-center">{listOfCategories}</div>
      <div className=" activity-container grid-x">
        <ul className="text-center activity-tile no-dot-list">
          <li>Welcome to Bean town reviews HomePage!</li>
          <li>
            Your one stop shop to see all of the reviews for your favorite places in Downtown
            boston!
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
