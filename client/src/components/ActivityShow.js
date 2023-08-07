import React, { useState, useEffect } from "react";
import ReviewsShowPage from "./ReviewsShowPage";

const ActivityShow = (props) => {
  const [activity, setActivity] = useState({
    name: "",
    location: "",
    description: "",
    reviews: []
  });

  const activityId = props.computedMatch.params.id;
  const getActivity = async () => {
    try {
      const response = await fetch(`/api/v1/activities/${activityId}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setActivity(body.activity);
    } catch (error) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getActivity();
  }, []);

  return (
    <div className="grid-x">
      <div className="activity-container activity-show cell small-4">
        <h3 className="activity-title">{activity.name}</h3>
        <p>{activity.location}</p>
        <p>{activity.description}</p>
      </div>
      <div className="activity-container cell auto">
        <ReviewsShowPage reviews={activity.reviews}/>
      </div>
    </div>
  );
};

export default ActivityShow;
