import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditReviews from "./EditReviews";
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
    <>
      <div className="grid-x">
        <div className="activity-show cell small-6">
          <div className="activity-container">
            <h3 className="activity-title">{activity.name}</h3>
            <p>{activity.location}</p>
            <p>{activity.description}</p>
          </div>
        </div>
        <div className="cell small-6">
        <div className="activity-container">
          <ReviewsShowPage reviews={activity.reviews} />
          </div>
        </div>
        <div className="containerBtn">
          <div className="btn">
            <Link to={`/reviews/${activityId}`}> Edit Review!</Link>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default ActivityShow;
