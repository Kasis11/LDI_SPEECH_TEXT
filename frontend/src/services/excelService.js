import api from "./api";

export async function uploadExcel(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/excel/upload",
    formData
  );

  return response.data;
}