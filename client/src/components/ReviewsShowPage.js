import React, { useEffect, useState } from "react";
//import ErrorList from "./ErrorList"
import translateServerErrors from "../services/translateServerErrors"
import NewReviewForm from "./NewReviewForm";

const ReviewsShowPage = ({ id, currentUser }) => {
  const [reviewList, setReviewList] = useState([]);

  const getReviews = async () => {
    try {
      const response = await fetch(`/api/v1/activities/${id}/reviews`);
      if (!response.ok) {
        const error = new Error(`${response.status} (${response.statusText})`);
        throw error;
      }
      const body = await response.json();
      setReviewList(body.reviews);
    } catch (error) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

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
        console.log(reviewData)
        setReviewList([...reviewList, reviewData.review])
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
  const listOfReviews = reviewList.map((reviewItem) => {
    return <li key={reviewItem.id}>{reviewItem.review}</li>;
  });

  return (
    <>
      <h1>Reviews</h1>
      <ul>{listOfReviews}</ul>
      {/* <ErrorList errors={errors} /> */}
      <NewReviewForm
      postNewReview={postReview}
      currentUser = {currentUser}/>
    </>
  );
};

export default ReviewsShowPage;
