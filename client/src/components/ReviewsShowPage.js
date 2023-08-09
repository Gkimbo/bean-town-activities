import React, { useState } from "react";
import ErrorList from "./registration/components/layout/ErrorList";
import NewReviewForm from "./NewReviewForm";

const ReviewsShowPage = ({ activityName, reviews, postReview, errors, activityId, user }) => {
  const [rating, setRating] = useState({
}); 
  console.log(rating);

  const postRating = async (ratingObject) => {
    try {
      const response = await fetch(`/api/v1/activities/${activityId}/reviews/rating`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(ratingObject)
      });

      if (!response.ok) { 
        const error = new Error(`${response.status} (${response.statusText})`);
        throw error;
      }

      const responseData = await response.json();
      console.log(responseData)
      setRating(responseData);
    } catch (error) {
      console.error('Error in fetch!', error.message);
    }
  };

  const handleRating = ({ reviewId, selectedRating }) => {
    postRating({ reviewId, rating: selectedRating });
  };

  const listOfReviews = reviews.map((review) => {
    console.log(`Review ID: ${review.id}, User Rating: ${rating.rating}`);
    return (
      <li key={review.id}>
        {review.content}
        {review.id !== rating.reviewId && rating.rating == 2 ? (
          <div onClick={() => handleRating({ reviewId: review.id, selectedRating: 1 })}><i>Upvote</i></div>
        ) : null}
        {review.id !== rating.reviewId && rating.rating == 1? (
          <div onClick={() => handleRating({ reviewId: review.id, selectedRating: 2 })}><i>Downvote</i></div>
        ) : null}
        {rating.rating === undefined ? (
          <>
            <div onClick={() => handleRating({ reviewId: review.id, selectedRating: 2 })}><i>Downvote</i></div>
            <div onClick={() => handleRating({ reviewId: review.id, selectedRating: 1 })}><i>Upvote</i></div>
          </>
        ) : null}
      </li>
    );
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
