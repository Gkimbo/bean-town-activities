import React, { useState, useEffect } from "react";
import EditReviewTile from "./EditReviewTile";

const EditReviews = (props) => {
  const [reviewsToEdit, setReviewsToEdit] = useState([]);

  const getReviews = async () => {
    try {
      const response = await fetch(`/api/v1/activities/${props.match.params.id}/reviews`);
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const responseData = await response.json();
      setReviewsToEdit(responseData.reviews);
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
    return (
      <EditReviewTile key={review.id} review={review} handleDelete={handleDelete} />
    )
  });

  return (
    <div className="reviews-edit activity-container">
      <h1>Delete your reviews!</h1>
      <ul>{listOfReviews}</ul>
    </div>
  );
};

export default EditReviews;
