import React, { useState, useEffect } from "react";

const ActivitiesList = (props) => {
  const [activities, setActivities] = useState([]);
  const [category, setCategory] = useState({});

  const getActivities = async () => {
    try {
      const response = await fetch(`/api/v1/categories/${props.match.params.id}`);
      if (!response.status) {
        const error = new Error(`${response.status} (${response.statusText})`);
        throw error;
      }
      const responseData = await response.json();
      console.log(responseData);
      setActivities(responseData.category.activities);
      setCategory(responseData.category);
    } catch (error) {
      console.error("Error in fetch!");
      console.error(error.message);
    }
  };

  useEffect(() => {
    getActivities();
  }, []);

  const listOfActivities = activities.map((activity) => {
    return <li key={activity.id}>{activity.name}</li>;
  });

  return (
    <div className="activities-list">
      <h1>{category.name}</h1>
      <ul>{listOfActivities}</ul>
    </div>
  );
};

export default ActivitiesList;
