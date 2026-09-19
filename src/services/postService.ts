import { ApiError } from "../types/api";
import { Post } from "../types/post";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    //posts-does-not-exist
    //  const response = await fetch(`${BASE_URL}/posts-does-not-exist`);

    if (!response.ok) {
      // server responded, but with an error status (4xx/5xx)
      const error: ApiError = {
        type: "server-error",
        message: `Server responded with status ${response.status}`,
      };
      throw error;
    }

    const data: Post[] = await response.json();
    return data;
  } catch (err) {
    // if it's already our typed ApiError, rethrow as-is
    if (err && typeof err === "object" && "type" in err) {
      throw err as ApiError;
    }

    // fetch throws a plain TypeError when there's no network at all
    const networkError: ApiError = {
      type: "no-internet",
      message: "Network request failed. Please check your connection.",
    };
    throw networkError;
  }
}
