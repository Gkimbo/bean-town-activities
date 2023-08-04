import React, { useEffect, useState } from "react";

const ReviewsShowPage = ({ id }) => {
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

  const listOfReviews = reviewList.map((reviewItem) => {
    return <li key={reviewItem.id}>{reviewItem.review}</li>;
  });

  return (
    <>
      <h1> Review! </h1>
      <ul>{listOfReviews}</ul>
    </>
  );
};

export default ReviewsShowPage;
