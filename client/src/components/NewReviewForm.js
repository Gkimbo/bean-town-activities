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
            <h1>Add reviews here</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Review:
                    <input
                        type="text"
                        name="review"
                        onChange={handleInputChange}
                        value={newReview.review}
                    />
                </label>

                <div className="button-group">
                    <input className="button" type="submit" value="Submit" />
                </div>
            </form>
        </div>
    )
}

export default NewReviewForm