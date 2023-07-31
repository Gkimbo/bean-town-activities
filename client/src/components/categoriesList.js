import React, { useEffect, useState } from "react";

const categoriesList = (props) => {
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
    return <li key={category.id}>{category.name}</li>;
  });

  return (
    <div className="categories-list">
      <h1>Activities!</h1>
      <ul>{listOfCategories}</ul>
    </div>
  );
};

export default categoriesList;
