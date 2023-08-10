import React from "react";

const RatingTile = ({ id, content, downVote, upVote, totalRating, postRating, voted }) => {
  const handleRating = ({ reviewId, selectedRating }) => {
    postRating(reviewId, selectedRating);
  };

  if (voted === true) {
    return (
      <li>
        {content}
        <div className="voting-div thumbs-up">{`Likes: ${upVote}`}</div>
        <div className="voting-div thumbs-down">{`Dislikes: ${downVote}`}</div>
        <div className="voting-div">{`Rating: ${totalRating}`}</div>
      </li>
    );
  } else if (!voted) {
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
  } 

};

export default RatingTile;
