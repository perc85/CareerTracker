const jobDetails = async (id) => {
    const token = localStorage.getItem("access_token")
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/jobs/get-job/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    if(!response.ok){
        throw new Error(`Response status: ${response.status}`)
    }
    const data = await response.json()
    return data
}

export default jobDetails