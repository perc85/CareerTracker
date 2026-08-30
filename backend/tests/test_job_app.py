import json

def test_job_data_retrieval(client, auth_headers):
    response = client.get('/jobs/get-jobs', headers=auth_headers)
    assert response.status_code == 200

def test_add_job_data(client, auth_headers):
    payload = {
                'company': "Northstar Labs",
                "title": "Software Engineer",
                "location": "Kansas",
                "job_type": "full-time",
                "status": "applied",
                "salary_range": "$80,000 - $90,000",
                "notes": "applied via linkedin"
            }
    headers = {
        "Content-Type": "application/json",
        "Authorization": auth_headers['Authorization']
    }
    response = client.post('/jobs/add-job', data=json.dumps(payload), headers=headers)

    assert response.status_code == 201

def test_get_all_jobs(client, auth_headers):
    response = client.get('/jobs/get-jobs', headers=auth_headers)
    assert response.status_code == 200
