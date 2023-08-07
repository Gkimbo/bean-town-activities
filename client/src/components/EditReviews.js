import React, {useState, useEffect} from "react";

const EditReviews = (props) => {
    // const [reviewsToEdit, setReviewsToEdit] = useState([])
    // const [selectedReview, setSelectedReview] = useState({})

    // const getReviews = async () =>{
    //     try {
    //         const response = await fetch(`/api/v1/activities/${props.match.params.id}/reviews`)
    //         if(!response){
    //             const error = new Error(`${response.status} (${response.statusText})`)
    //             throw error
    //         }
    //         const responseData = await response.json()
    //         console.log(responseData)
    //         setReviewsToEdit(responseData.reviews)
    //     } catch (error) {
    //         console.error("Error in fetch!", error.message)
    //     }
    // }

    // const removeReview = async () => {
    //     try {
    //         const response = await fetch(`/api/v1/activities/${props.match.params.id}/reviews/${selectedReview.id}`, {
    //             method: DELETE,
    //             body: JSON.stringify(selectedReview),
    //             headers: new Headers({
    //                 "Content-Type": "application/json"
    //                 })
    //         })
    //         if(!response){
    //             const error = new Error(`${response.status} (${response.statusText})`)
    //             throw error
    //         }
    //         setSelectedReview({})
    //     } catch (error) {
    //         console.error("Error in fetch!", error.message)
    //     }
    // }

    // useEffect(()=> {
    //     getReviews()
    // }, [])

    // const handleDelete = (reviewToDelete) => {
    //     setSelectedReview(reviewToDelete)
    //     removeReview()
    //     getReviews()
    // }

    // const listOfReviews = reviewsToEdit.map(review => {
    //     return(
    //         <li key={review.id}>
    //             {review.review}
    //             <a onClick={handleDelete({review})} className="delete-button">
    //                 X
    //             </a>
    //         </li>
    //     )
    // })

    return(
        <div className="reviews-edit activity-container">
            {/* <h1>Edit your reviews!</h1>
            <ul>
                {listOfReviews}
            </ul> */}
        </div>
    )
} 

export default EditReviews