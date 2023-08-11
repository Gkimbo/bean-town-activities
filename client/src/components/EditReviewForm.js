import React, { useState } from "react"

const EditReviewForm = ({ changeReview , review }) => {
    const [newEditedReview, setNewEditedReview] = useState({
        content: ""
    })

    const handleInputChange = event => {
        setNewEditedReview({
            ...newEditedReview,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        changeReview({ ...newEditedReview })
        clearForm()
    }

    const clearForm = () => {
        setNewEditedReview({
            content: ""
        })
    }

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        className="text-box-1"
                        type="text"
                        name="content"
                        onChange={handleInputChange}
                        value={newEditedReview.content}
                        placeholder={review.content}
                    />
                </label>
                <input className="button" type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default EditReviewForm