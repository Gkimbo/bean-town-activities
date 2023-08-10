import React, { useState } from "react";

const RatingTile = ({ id, content, downVote, upVote, totalRating }) => {
  const [ratings, setRatings] = useState({});

  const postRating = async (reviewId, selectedRating) => {
    try {
      const response = await fetch(`/api/v1/ratings`, {
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
      setRatings(responseData.newRating)
    } catch (error) {
      console.error("Error in fetch!", error.message);
    }
  };

  const handleRating = ({ reviewId, selectedRating }) => {
    postRating(reviewId, selectedRating);
  };

  if (ratings.error) {
    return (
      <li>
        {content}
        <div className="voting-div thumbs-down">{ratings.error}</div>
        <div className="thumbs-up">{`Likes: ${upVote}`}</div>
        <div className="thumbs-down">{`Dislikes: ${downVote}`}</div>
        <div className="">{`Rating: ${totalRating}`}</div>
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
        <div className="thumbs-up">{`Likes: ${upVote}`}</div>
        <div className="thumbs-down">{`Dislikes: ${downVote}`}</div>
        <div className="">{`Rating: ${totalRating}`}</div>
      </li>
    );
  }
};

export default RatingTile;
