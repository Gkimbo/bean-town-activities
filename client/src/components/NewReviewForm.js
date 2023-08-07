import React, { useState } from "react"

const NewReviewForm = ({ postNewReview, currentUser }) => {
    const [newReview, setNewReview] = useState({
        review: ""
    })

    const handleInputChange = event => {
        setNewReview({
            ...newReview,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        postNewReview({ ...newReview, userId: currentUser })
        clearForm()
    }

    const clearForm = () => {
        setNewReview({
            review: ""
        })
    }

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        name="review"
                        onChange={handleInputChange}
                        value={newReview.review}
                    />
                </label>
                <input className="button" type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default NewReviewForm