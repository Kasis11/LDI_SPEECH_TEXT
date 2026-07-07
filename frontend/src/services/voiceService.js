import api from "./api";

export async function uploadAudio(audioBlob) {
  try {
    console.log("Inside uploadAudio");

    const formData = new FormData();

    formData.append("file", audioBlob, "recording.webm");

    // const response = await api.post("/voice/upload", formData);
    const response = await api.post("/voice/upload", formData);
    

    console.log("Backend Response:", response.data);

    return response.data;

    return response.data;
  } catch (err) {
    console.error(err);
  }
}
