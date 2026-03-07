const appStatus = async () => {
	const url = `${process.env.REACT_APP_BACKEND_URL}/jobs/get-app-status`
    const token = localStorage.getItem("access_token")
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    if(!response.ok){
        throw new Error(`Response status: ${response.status}`)
    }
    const data = await response.json()
    return data
}

const jobInformation = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/jobs/get-jobs`
    const token = localStorage.getItem("access_token")

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    if(!response.ok){
        throw new Error(`Response status: ${response.status}`)
    }
    const data = await response.json()
    
    return data
}

export { appStatus, jobInformation };