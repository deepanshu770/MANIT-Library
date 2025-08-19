export interface LoginResponse {
  success: boolean;
  data?: {
    student_id: number;
    name: string;
    course:string;
    department:string
    [key: string]: any; // any extra fields from backend
  };
  error?: string;
}

/**
 * Utility: wraps fetch with timeout (React Native safe)
 */
const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeoutMs: number
): Promise<Response> => {
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeoutMs)
    ),
  ]) as Promise<Response>;
};

export const loginStudent = async (
  scholarID: string,
  password: string,
  backendURL: string,
  timeoutMs = 8000
): Promise<LoginResponse> => {
  // --- Basic Validation ---
  if ( scholarID.length < 9) {
    return { success: false, error: "Invalid Scholar ID (must be a positive number)" };
  }

  if (password.length < 5) {
    return { success: false, error: "Password must be at least 5 characters long" };
  }



  try {
    const res = await fetchWithTimeout(
      `${backendURL}/api/student/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_id: scholarID, password }),
      },
      timeoutMs
    );

    if (!res.ok) {
      return {
        success: false,
        error: `Server error: ${res.status} ${res.statusText}`,
      };
    }

    const data = await res.json();
    if (data?.student_id) {
      return { success: true, data };
    }

    return { success: false, error: data?.message || "Login failed" };
  } catch (error: any) {
    return { success: false, error: error?.message || "Network error" };
  }
};
