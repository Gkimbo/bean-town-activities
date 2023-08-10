import React, { useState } from "react";

const RatingTile = ({ id, content, user, activityId }) => {
  const [ratings, setRatings] = useState({});

  const postRating = async (reviewId, selectedRating) => {
    try {
      const response = await fetch(`/api/v1/activities/${activityId}/reviews/rating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewId, rating: selectedRating }),
      });
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const responseData = await response.json();
    
      setRatings(responseData);
    } catch (error) {
      console.error("Error in fetch!", error.message);
    }
  };

  const handleRating = ({ reviewId, selectedRating }) => {
    postRating(reviewId, selectedRating);
  };

  if(!ratings.userId){
    return (
      <li>
        {content}
          <div
            onClick={() => handleRating({ reviewId: id, selectedRating: 2 })}
            className="voting-div"
          >
            <i className="fa-regular fa-thumbs-up">
            </i>
          </div>
          <div
            onClick={() => handleRating({ reviewId: id, selectedRating: 1 })}
            className="voting-div"
          >
            <i className="fa-regular fa-thumbs-down"></i>
          </div>
      
      </li>
    );
  } else {

    return (
      <li>
        {content}
      </li>
    );
  }
};

export default RatingTile;
