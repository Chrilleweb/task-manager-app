interface ApiServiceProps {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: object | string;
}

const apiService = async ({ url, method, body }: ApiServiceProps) => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    };

    const response = await fetch(url, {
      method,
      headers,
      body: method !== "GET" ? JSON.stringify(body) : undefined,
    });

    const responseData = await response.json();

    if (!response.ok) {
      let errorMessage = "Request failed";
      if (responseData && responseData.message) {
        errorMessage = responseData.message;
      }
      throw new Error(errorMessage);
    }

    return responseData;
  } catch (error: any) {
    console.error("API request failed:", error);
    throw new Error(error.message || "Internal Server Error");
  }
};

export default apiService;
