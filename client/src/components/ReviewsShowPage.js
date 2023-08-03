import React, { useEffect, useState } from "react"

const ReviewsShowPage = (props) => {
    const [reviewlist, setReviewList] = useState([])

    const getReviews = async () => {
        const activityId = props.match.params.id
        try {
            const response = await fetch(`/api/v1/activities/${activityId}/reviews`)
            if (!response.ok) {
                const error = new Error(`${response.status} (${response.statusText})`)
                throw error
            }
            const body = await response.json()
            setReviewList(body.reviews)
        } catch (error) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }

    useEffect(() => {
        getReviews()
    }, [])

    const listOfReviews = reviewlist.map((reviewItem) => {
        return (
            <li key={reviewItem.id}>{reviewItem.review}</li>
        )
    })

    return (
        <>
            <h1> Review Page </h1>
            <ul>{listOfReviews}</ul>
        </>
    )
}

export default ReviewsShowPage