// Base API client with error handling
class ApiError extends Error {
  constructor(message: string, public status: number, public errors?: Record<string, string[]>) {
    super(message);
    this.name = "ApiError";
  }
}

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  errors?: Record<string, string[]>;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl = "") {
    this.baseUrl = baseUrl;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const data: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new ApiError(data.error || "Request failed", response.status, data.errors);
    }

    if (data.error) {
      throw new ApiError(data.error, response.status, data.errors);
    }

    return data.data as T;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data: FormData | Record<string, unknown>): Promise<T> {
    const isFormData = data instanceof FormData;

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: isFormData
        ? {}
        : {
            "Content-Type": "application/json",
          },
      body: isFormData ? data : JSON.stringify(data),
    });

    return this.handleResponse<T>(response);
  }

  async patch<T>(endpoint: string, data: FormData | Record<string, unknown>): Promise<T> {
    const isFormData = data instanceof FormData;

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PATCH",
      headers: isFormData
        ? {}
        : {
            "Content-Type": "application/json",
          },
      body: isFormData ? data : JSON.stringify(data),
    });

    return this.handleResponse<T>(response);
  }
}

export const apiClient = new ApiClient();
