import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ActivitiesList = (props) => {
  const [category, setCategory] = useState({ activities: [] });

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
    return (
      <li key={activity.id} className="btn-2">
        <Link to={`/activities/${activity.id}`}>{activity.name}</Link>
      </li>
    );
  });

  return (
    <div className="text-center activity-container">
      <div className="no-dot-list">
        <h1>{category.name}</h1>
        <ul>{listOfActivities}</ul>
      </div>
    </div>
  );
};

export default ActivitiesList;
