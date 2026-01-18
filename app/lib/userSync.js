// Utility functions for user synchronization between Firebase and MongoDB

export const syncUserToMongoDB = async (firebaseUser) => {
  if (!firebaseUser) {
    console.error("No Firebase user provided for sync");
    return { success: false, error: "No user provided" };
  }

  const userInfo = {
    name:
      firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "User",
    email: firebaseUser.email,
    uid: firebaseUser.uid,
    image: firebaseUser.photoURL || "",
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("User sync result:", data);

    return {
      success: true,
      data,
      message: data.message || "User synced successfully",
    };
  } catch (error) {
    console.error("User sync error:", error);
    return {
      success: false,
      error: error.message,
      message: "Failed to sync user to database",
    };
  }
};

export const getUserRole = async (email) => {
  if (!email) {
    return { role: "user", exists: false };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/role/${email}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user role:", error);
    return { role: "user", exists: false, error: error.message };
  }
};
