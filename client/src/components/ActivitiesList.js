import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ActivitiesList = (props) => {
  console.log(props);
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
      <div key={activity.id} className="containerBtn">
        <div className="btn">
          <Link to={`/activities/${activity.id}`}>{activity.name}</Link>
        </div>
      </div>
    );
  });

  return (
    <div className="grid-x align-center-middle text-center">
      <div className="text-center cell activity-list-container small-3 align-center">
        <div className="no-dot-list">
          <h1 className="title-text">{category.name}</h1>
          <ul>{listOfActivities}</ul>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesList;
