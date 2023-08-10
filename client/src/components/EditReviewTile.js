import React from "react"

const EditReviewTile = ({review , handleDelete , handleEdit}) =>{
    return (
        <div>
          <li key={review.id}>
            {review.content}
          </li>
          <div className="button-delete" onClick={() => handleEdit(review.id)}>
            <span>Edit</span>
            <svg viewBox="-5 -5 110 110" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0" />
            </svg>
          </div>

          <div className="button-delete" onClick={() => handleDelete(review.id)}>
            <span>Delete</span>
            <svg viewBox="-5 -5 110 110" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0" />
            </svg>
          </div>
        </div>
    )
}


export default EditReviewTile