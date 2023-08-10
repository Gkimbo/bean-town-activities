import React, { useState } from "react";
import ErrorList from "./registration/components/layout/ErrorList";
import NewReviewForm from "./NewReviewForm";
import RatingTile from "./RatingTile";

const ReviewsShowPage = ({ activityName, reviews, postReview, errors, activityId, user }) => {
  const listOfReviews = reviews.map((review) => (
    <RatingTile
      key={review.id}
      id={review.id}
      content={review.content}
      activityId={activityId}
    />
  ));

  let reviewContent;
  if (listOfReviews.length === 0) {
    reviewContent = <p>No reviews yet!</p>;
  } else {
    reviewContent = <ul>{listOfReviews}</ul>;
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
