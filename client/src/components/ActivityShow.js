import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReviewsList from "./ReviewsList";
import translateServerErrors from "../services/translateServerErrors";

const ActivityShow = (props) => {
  const [errors, setErrors] = useState([]);
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
      console.error(`Error in fetch: ${error.message}`);
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
        setActivity({ ...activity, reviews: [...activity.reviews, reviewData.review]});
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const postRating = async (reviewId, selectedRating) => {
    try {
      const response = await fetch(`/api/v1/ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewId, rating: selectedRating }),
      });
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const responseData = await response.json();
      const reviewIndex = activity.reviews.findIndex(review => review.id === responseData.review.id);
      if (reviewIndex !== -1) {
        const updatedReviews = [...activity.reviews];
        updatedReviews[reviewIndex] = responseData.review;
        setActivity({ ...activity, reviews: updatedReviews });
      } else {
        setActivity({ ...activity, reviews: [...activity.reviews, responseData.review] });
      }
    } catch (error) {
      console.error("Error in fetch!", error.message);
    }
  };

  useEffect(() => {
    getActivity();
  }, []);

  const review = activity.reviews.find(review =>  props.user.id === review.userId )

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
          <ReviewsList
            errors={errors}
            postReview={postReview}
            activityName={activity.name}
            reviews={activity.reviews}
            postRating={postRating}
          />
        </div>
      </div>

      <div className="cell small-12">
        {review && <Link className="btn-hover color-1" to={`/reviews/${activityId}`}>
          Edit/Delete Review
        </Link>}
      </div>
    </div>
  );
};

export default ActivityShow;
