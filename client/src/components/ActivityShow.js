import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReviewsShowPage from "./ReviewsShowPage";
import translateServerErrors from "../services/translateServerErrors";

const ActivityShow = (props) => {
  const [errors, setErrors] = useState([]);
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

  const postReview = async (newReview) => {
    try {
      const response = await fetch(`/api/v1/activities/${activityId}/reviews`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newReview),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const errorBody = await response.json();
          const newErrors = translateServerErrors(errorBody.errors);
          return setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        const reviewData = await response.json();
        setErrors([]);
        setActivity({ ...activity, reviews: [...activity.reviews, reviewData.review] });
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
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
            <li>
              <strong>Address: </strong>
              {activity.location}
            </li>
            <li>
              <strong>Description: </strong>
              {activity.description}
            </li>
          </ul>
        </div>
      </div>
      <div className="cell small-12 medium-6">
        <div className="activity-container">
          <ReviewsShowPage
            errors={errors}
            postReview={postReview}
            activityName={activity.name}
            reviews={activity.reviews}
          />
        </div>
      </div>
      <div className="cell small-12">
        <Link className="btn-hover color-1" to={`/reviews/${activityId}`}>
          Edit Review!
        </Link>
      </div>
    </div>
  );
};

export default ActivityShow;
