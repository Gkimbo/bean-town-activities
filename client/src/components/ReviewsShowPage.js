import React, { useEffect, useState } from "react";
import ErrorList from "./registration/components/layout/ErrorList";
import translateServerErrors from "../services/translateServerErrors"
import NewReviewForm from "./NewReviewForm";

const ReviewsShowPage = ({ id, currentUser, activityName, reviews, reviewList, setReviewList }) => {

  const [errors, setErrors] = useState([])

  const postReview = async (newReview) => {
    try {
      const response = await fetch(`/api/v1/activities/${id}/reviews`, {
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
        setReviewList([...reviewList, reviewData.review])
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const listOfReviews = reviews.map(({ id, content }) => {
    return <li key={id}>{content}</li>;
  });


  let reviewContent
  if (listOfReviews.length === 0) {
    reviewContent = <p>No reviews yet!</p>
  } else {
    reviewContent = <ul>{listOfReviews}</ul>
  }

  return (
    <div className="review-show-box">
      <div className="review-form">
        <h5>Share your thoughts on {activityName} !!</h5>
        <NewReviewForm
          postNewReview={postReview}
          currentUser={currentUser} />
      </div>
      <div className="reviews">
        <h4>Reviews</h4>
        {reviewContent}
        <ErrorList errors={errors} />
      </div>
    </div>
  );
};

export default ReviewsShowPage;
