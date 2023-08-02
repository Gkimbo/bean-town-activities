class ActivitySerializer {
    static getSummaryOfOne(activity){
        const acceptedAttributes = ["id", "name", "description"]
        const serializedActivity = {}

        for(const attribute of acceptedAttributes){
            serializedActivity[attribute] = activity[attribute]
        }
        return serializedActivity
    }

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