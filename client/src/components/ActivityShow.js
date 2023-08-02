import React, { useState, useEffect } from "react"

const ActivityShow = props => {
    const [activity, setActivity] = useState({
        name: "",
        location: "",
        description: ""

    })

    const getActivity = async () => {
        const activityId = props.computedMatch.params.id
        try {
            const response = await fetch(`/api/v1/activities/${activityId}`)
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw (error)
            }

            const body = await response.json()
            setActivity(body.activity)
        } catch (error) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }

    useEffect(() => {
        getActivity()
    }, [])


    return (
        <div className="activity-container">
            <h1>{activity.name}</h1>
            <h4>{activity.location}</h4>
            <p>{activity.description}</p>
        </div>
    )
}

export default ActivityShow