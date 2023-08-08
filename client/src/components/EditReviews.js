import React, { useState, useEffect } from "react";

const EditReviews = (props) => {
  const [reviewsToEdit, setReviewsToEdit] = useState([]);
  console.log("reviewsToEdit", reviewsToEdit)
  const [currentUser, setCurrentUser] = useState(undefined);
  const getReviews = async () => {
    try {
      const response = await fetch(`/api/v1/activities/${props.match.params.id}`);
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const responseData = await response.json();
      setCurrentUser(responseData.activity.user);
      console.log("currentUser", currentUser)
      setReviewsToEdit(responseData.activity.reviews);
    } catch (error) {
      console.error("Error in fetch!", error.message);
    }
  };

  const removeReview = async (id) => {
    try {
      const response = await fetch(`/api/v1/activities/${props.match.params.id}/reviews/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      setReviewsToEdit(reviewsToEdit.filter((review) => review.id !== id));
    } catch (error) {
      console.error("Error in fetch!", error.message);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  const handleDelete = (id) => {
    removeReview(id);
  };

  const listOfReviews = reviewsToEdit.map((review) => {
    console.log("inside list of reviews map, review.userId: ", review.userId)
    console.log("inside list of reviews map, currentUser: ", currentUser)
    if (currentUser === review.userId) {
      return (
        <div>
          <div className="button-delete" onClick={() => handleDelete(review.id)}>
            <span>Delete</span>
            <svg viewBox="-5 -5 110 110" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0" />
            </svg>
          </div>
          <li key={review.id}>
            {review.content}
          </li>
        </div>
      )
    }
    else {
      return (
        <li key={review.id}>
          {review.content}
        </li>
      );
    }
  });

  return (
    <div className="reviews-edit activity-container">
      <h1>Edit your reviews!</h1>
      <ul>{listOfReviews}</ul>
    </div>
  );
};

export default EditReviews;
