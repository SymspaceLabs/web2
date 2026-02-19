export const getAllBlogs = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Assuming this returns { blogs: [...] }
  } catch (error) {
    console.error("Error during fetching blogs:", error);
    return { blogs: [] }; // Return a fallback so the UI doesn't crash
  }
};