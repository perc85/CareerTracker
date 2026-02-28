const appStatus = async () => {
	const url = 'http://127.0.0.1:5000/jobs/get-app-status'
    const response = await fetch(url)
    if(!response.ok){
        throw new Error(`Response status: ${response.status}`)
    }
    const data = await response.json()
    return data
}

const jobInformation = async () => {
    const url = 'http://127.0.0.1:5000/jobs/get-jobs'

    const response = await fetch(url)
    if(!response.ok){
        throw new Error(`Response status: ${response.status}`)
    }
    const data = response.json()
    
    return data
}

export { appStatus, jobInformation };