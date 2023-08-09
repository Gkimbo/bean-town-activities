import React, { useState } from "react";
import ErrorList from "./registration/components/layout/ErrorList";
import NewReviewForm from "./NewReviewForm";

const ReviewsShowPage = ({ activityName, reviews, postReview, errors }) => {

  const [rating, setRating] = useState({
    reviewId: "",
    rating: ""
  })

  const handleRatingDown = (event) => {
    event.preventDefault()
    
    console.log(event.currentTarget)
  }
  const handleRatingUp = (event) => {
    event.preventDefault()
    console.log(event.currentTarget)
  }

  const listOfReviews = reviews.map((review) => {
    return (
    <li key={review.id}>
      {review.content} 
      <div onClick={handleRatingDown} value={review.id}>Downvote</div>
      <div onClick={handleRatingUp} value={review.id}>Upvote</div>
    </li>
    );
  });

  let reviewContent
  if (listOfReviews.length === 0) {
    reviewContent = <p>No reviews yet!</p>
  } else {
    reviewContent = <ul>{listOfReviews}</ul>
  }

  const postRating = async (ratingObject) => {
    try {
      const response = await fetch(`/api/v1/activities/${activityId}/reviews/rating`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(ratingObject)
      })
      if(!response){
        const error = new Error(`${response.status} (${response.statusText})`)
        throw error
      }
      const responseData = await response.json()

      //set state
    } catch (error) {
      console.error("Error in fetch!", error.message)
    }
  }

  return (
    <div className="review-show-box">
      <div className="review-form">
        <h5>Share your thoughts on {activityName} !!</h5>
        <NewReviewForm
          postNewReview={postReview}
        />
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
