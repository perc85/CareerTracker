const jobDetails = async (id) => {
    const response = await fetch(`http://127.0.0.1:5000/jobs/get-job/${id}`)
    if(!response.ok){
        throw new Error(`Response status: ${response.status}`)
    }
    const data = await response.json()
    return data
}

export default jobDetails