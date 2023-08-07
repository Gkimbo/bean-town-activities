import React, { useState, useEffect } from "react";

const EditReviews = (props) => {
  const [reviewsToEdit, setReviewsToEdit] = useState([])

    const getReviews = async () =>{
        try {
            const response = await fetch(`/api/v1/activities/${props.match.params.id}/reviews`)
            if(!response){
                const error = new Error(`${response.status} (${response.statusText})`)
                throw error
            }
            const responseData = await response.json()
            console.log(responseData)
            setReviewsToEdit(responseData.reviews)
        } catch (error) {
            console.error("Error in fetch!", error.message)
        }
    }

    const removeReview = async (id) => {
        try {
            const response = await fetch(`/api/v1/activities/${props.match.params.id}/reviews/${id}`,
            {method: 'DELETE'})

            if(!response){
                const error = new Error(`${response.status} (${response.statusText})`)
                throw error
            }
            setReviewsToEdit(reviewsToEdit.filter(review => review.id !== id))
        } catch (error) {
            console.error("Error in fetch!", error.message)
        }
    }

    useEffect(()=> {
        getReviews()
    }, [])

    const handleDelete = (event) => {
        event.preventDefault()
        console.log(event)
        removeReview(event.target.id)
    }

    const listOfReviews = reviewsToEdit.map(({id, review}) => {
    return (
      <li key={id}>
        {review}
        <button class="noselect" onClick={handleDelete}>
          <span class="text">Delete</span>
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
            </svg>
          </span>
        </button>
      </li>
    );
  });

  return (
    <div className="reviews-edit activity-container">
      <h1>Edit your reviews!</h1>
      <ul>{listOfReviews}</ul>
    </div>
  );
};

export default EditReviews;
