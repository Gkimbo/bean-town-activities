import React, { useState, useEffect } from "react";
import EditReviewTile from "./EditReviewTile";
import EditReviewForm from "./EditReviewForm";

const ReviewsEditor = (props) => {
  const [reviewsToEdit, setReviewsToEdit] = useState([]);
  const [editForm, setEditForm] = useState(false)
  const [review, setReview] = useState([])

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

  const changeReview = async (newEditedReview) => {
    const id = review.id
    try {
      const response = await fetch(`/api/v1/activities/${props.match.params.id}/reviews/${id}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newEditedReview),
      })
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
      }
      const responseData = await response.json();
      const addEditedReview = reviewsToEdit.map((review) => {
        if (review.id === id) {
          review.content = responseData.review.content
        }
        return review
      })
      setReviewsToEdit(addEditedReview);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  }

  useEffect(() => {
    getReviews();
  }, []);

  const handleDelete = (id) => {
    setEditForm(false)
    removeReview(id);
  };

  const handleEdit = (id) => {
    setEditForm(true)
    const review = reviewsToEdit.find((review) => review.id === id)
    setReview(review)
  }

  const listOfReviews = reviewsToEdit.map((review) => {
    return (
      <EditReviewTile review={review} handleDelete={handleDelete} handleEdit={handleEdit} />
    )
  });

  return (
    <div className="reviews-edit activity-container">
      <h1>Edit or Delete your reviews for this Activity!</h1>
      <ul>{listOfReviews}</ul>
      <div className="edit-form">
        {editForm && <EditReviewForm
          review={review}
          changeReview={changeReview}
        />}
      </div>
    </div>
  );
};

export default ReviewsEditor;
