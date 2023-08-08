import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReviewsShowPage from "./ReviewsShowPage";

const ActivityShow = (props) => {
  const [activity, setActivity] = useState({
    name: "",
    location: "",
    description: "",
    reviews: [],
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
    <div className="grid-x ">
      <div className="activity-show cell small-12 medium-6">
        <div className="activity-show-container">
          <h3 className="activity-title">{activity.name}</h3>
          <ul className="no-dot-list">
            <li><strong>Address: </strong>{activity.location}</li>
            <li><strong>Description: </strong>{activity.description}</li>
          </ul>
        </div>
      </div>
      <div className="cell small-12 medium-6">
        <div className="activity-container">
          <ReviewsShowPage reviews={activity.reviews} />
        </div>
      </div>
      <div className="cell small-12">
        <Link className="btn-hover color-1" to={`/reviews/${activityId}`}>Edit Review!</Link>
      </div>
    </div>
  );
};

export default ActivityShow;
