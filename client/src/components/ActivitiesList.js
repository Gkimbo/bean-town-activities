import React, { useState, useEffect } from "react";

const ActivitiesList = (props) => {
  const [category, setCategory] = useState({ activities: [] })

  const getActivities = async () => {
    try {
      const response = await fetch(`/api/v1/categories/${props.computedMatch.params.id}`);
      if (!response.status) {
        const error = new Error(`${response.status} (${response.statusText})`);
        throw error;
      }
      const responseData = await response.json();
      setCategory(responseData.category);
    } catch (error) {
      console.error("Error in fetch!");
      console.error(error.message);
    }
  };

  useEffect(() => {
    getActivities();
  }, []);

  const listOfActivities = category.activities.map((activity) => {
    return <li key={activity.id}>{activity.name}</li>;
  });

  return (
    <div className="grid-y">
      <div className="cell small-12">
        <h1>{category.name}</h1>
        <ul>{listOfActivities}</ul>
      </div>
    </div>
  );
};

export default ActivitiesList;