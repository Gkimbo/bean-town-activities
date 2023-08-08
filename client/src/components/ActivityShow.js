import React, { useState, useEffect } from "react";
import ReviewsShowPage from "./ReviewsShowPage";
import translateServerErrors from "../services/translateServerErrors";

const ActivityShow = (props) => {
  const [errors, setErrors] = useState([])
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

  const postReview = async (newReview) => {
    try {
      const response = await fetch(`/api/v1/activities/${activityId}/reviews`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newReview)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const errorBody = await response.json()
          const newErrors = translateServerErrors(errorBody.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      } else {
        const reviewData = await response.json()
        setErrors([])
        setActivity({ ...activity }, activity.reviews.push(reviewData.review))
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

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
        <ReviewsShowPage
          errors={errors}
          postReview={postReview}
          activityName={activity.name}
          reviews={activity.reviews}
        />
      </div>
    </div>
  );
};

export default ActivityShow;
