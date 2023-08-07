import React, { useEffect, useState } from "react";

const ReviewsShowPage = (props) => {
  
  const listOfReviews = props.reviews.map(({id, content}) => {
    return <li key={id}>{content}</li>;
  });

  return (
    <>
      <h1>Reviews</h1>
      <ul>{listOfReviews}</ul>
    </>
  );
};

export default ReviewsShowPage;
