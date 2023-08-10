import React, { useState } from "react";

const RatingTile = ({ id, content, activityId }) => {
  const [ratings, setRatings] = useState({});
  const [allRatings, setAllRatings] = useState([]);

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

  let upVotes = 0;
  let downVotes = 0;

  allRatings.forEach((ratingObject) => {
    if (id === ratingObject.reviewId && ratingObject.rating === 2) {
      upVotes++;
    }
    if (id === ratingObject.reviewId && ratingObject.rating === 1) {
      downVotes++;
    }
  });
  const totalVotes = upVotes - downVotes;

  const getRatings = async () => {
    try {
      const response = await fetch(`/api/v1/activities/${activityId}/reviews/rating`);
      if (!response.ok) {
        const error = new Error(`${response.status} (${response.statusText})`);
        throw error;
      }
      const responseData = await response.json();
      setAllRatings(responseData.allRatings);
    } catch (error) {
      console.error("Error in fetch!", error.message);
    }
  };

  const handleRating = ({ reviewId, selectedRating }) => {
    postRating(reviewId, selectedRating);
    getRatings();
  };

  if (ratings.newRating) {
    return (
      <li>
        {content}
        <div className="voting-div thumbs-down">{ratings.newRating}</div>
      </li>
    );
  } else if (!ratings.userId) {
    return (
      <li>
        {content}
        <div
          onClick={() => handleRating({ reviewId: id, selectedRating: 2 })}
          className="voting-div"
        >
          <i className="fa-regular fa-thumbs-up"></i>
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
        <div className="voting-div thumbs-up">{`Likes: ${upVotes}`}</div>
        <div className="voting-div thumbs-down">{`Dislikes: ${downVotes}`}</div>
        <div className="voting-div">{`Total: ${totalVotes}`}</div>
      </li>
    );
  }
};

export default RatingTile;
