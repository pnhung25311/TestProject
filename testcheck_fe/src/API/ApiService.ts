import axios from "axios";

const API_URL = "http://localhost:8888";
interface ApiResponse {
  [x: string]: any;
  data: [];
}

export const fetchData = async (PathLink: string): Promise<ApiResponse> => {
  try {
    const url = `${API_URL}${PathLink}`;
    console.log("Request URL:", url);
    const response = await axios.get<ApiResponse>(url);
    console.table(response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
};
