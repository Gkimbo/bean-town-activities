import React, { useState } from "react"

const NewReviewForm = ({ postNewReview, currentUser }) => {
    const [newReview, setNewReview] = useState({
        content: ""
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
            content: ""
        })
    }

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        name="content"
                        onChange={handleInputChange}
                        value={newReview.content}
                    />
                </label>
                <input className="button" type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default NewReviewForm