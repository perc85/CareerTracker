export async function fetchResumes() {
  const token = localStorage.getItem("access_token");

  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/resume/get-all-resumes`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error(`Resonse status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export async function fetchResume(resume_id) {
  const token = localStorage.getItem("access_token");
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/resume/${resume_id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await response.json();
  return data;
}

export async function addResume(resumeData) {
  const token = localStorage.getItem("access_token");

  const formData = new FormData();
  formData.append("resumeName", resumeData.resumeName);
  formData.append("category", resumeData.category);
  formData.append("notes", resumeData.notes);
  formData.append("file", resumeData.selectedFile);

  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/resume/add_resume`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export async function reviewResume(resume_id, job_description) {
  const token = localStorage.getItem("access_token");
  
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/resume/review/${resume_id}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: job_description})
    },
  );
  const data = await response.json();
  console.log('here')
  if (!response.ok) {
    const error = new Error(data.error || "Failed to review resume");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
