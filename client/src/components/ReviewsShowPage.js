import React, { useState } from "react";
import ErrorList from "./registration/components/layout/ErrorList";
import NewReviewForm from "./NewReviewForm";

const ReviewsShowPage = ({ activityName, reviews, postReview, errors, activityId, user }) => {
  const [ratings, setRatings] = useState({});

  const postRating = async (reviewId, selectedRating) => {
    try {
      const response = await fetch(`/api/v1/activities/${activityId}/reviews/rating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reviewId, rating: selectedRating })
      });

      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }

      const responseData = await response.json();
      setRatings({ ...ratings, [reviewId]: responseData.rating });
    } catch (error) {
      console.error('Error in fetch!', error.message);
    }
  };

  const handleRating = ({ reviewId, selectedRating }) => {
    postRating(reviewId, selectedRating);
  };

  const listOfReviews = reviews.map((review) => (
    <li key={review.id}>
      {review.content}
      {(review.id !== ratings.reviewId && ratings[review.id] === 2) && (
        <div onClick={() => handleRating({ reviewId: review.id, selectedRating: 1 })}><i>Upvote</i></div>
      )}
      {(review.id !== ratings.reviewId && ratings[review.id] === 1) && (
        <div onClick={() => handleRating({ reviewId: review.id, selectedRating: 2 })}><i>Downvote</i></div>
      )}
      {ratings[review.id] === undefined && (
        <>
          <div onClick={() => handleRating({ reviewId: review.id, selectedRating: 2 })}><i>Downvote</i></div>
          <div onClick={() => handleRating({ reviewId: review.id, selectedRating: 1 })}><i>Upvote</i></div>
        </>
      )}
    </li>
  ));

  let reviewContent;
  if (listOfReviews.length === 0){
    reviewContent = <p>No reviews yet!</p>
  } else{
    reviewContent = <ul>{listOfReviews}</ul>
  }

  return (
    <div className="review-show-box">
      <div className="review-form">
        <h5>Share your thoughts on {activityName}!</h5>
        <NewReviewForm postNewReview={postReview} />
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
