import axios from "axios";

// Create an Axios instance with a base URL
const apiClient = axios.create({
    baseURL: "http://localhost:5282/api", // Adjust the base URL if necessary
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to include the token in headers
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;