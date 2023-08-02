class ActivitySerializer {
    static getSummaryOfArray(activityArray){
        const acceptedAttributes = ["id", "name", "description"]

        const serializedActivity = activityArray.map(activity => {
            const serializedObject = {}
            for(const attribute of acceptedAttributes){
                serializedObject[attribute] = activity[attribute]
            }
            return serializedObject
        })

        return serializedActivity
    }
}

export default ActivitySerializer