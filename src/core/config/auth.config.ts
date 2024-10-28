interface UserData {
  accessToken: string;
  refreshToken: string;
  userId: string;
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
}

let authToken = "";

if (typeof window !== "undefined") {
  const userData = localStorage.getItem("userData");

  if (userData) {
    try {
      const parsedUserData: UserData = JSON.parse(userData);
      authToken = parsedUserData.accessToken;
    } catch (error) {
      console.error("Error parsing userData:", error);
    }
  } else {
    console.log("No userData found in localStorage");
  }
}

function getAuthToken(): string {
  let authToken = "";

  if (typeof window !== "undefined") {
    try {
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedUserData: UserData = JSON.parse(userData);
        authToken = parsedUserData.accessToken;
      } else {
        console.log("No userData found in localStorage");
      }
    } catch (error) {
      console.error("Error parsing userData:", error);
    }
  }

  return authToken;
}

function getRefreshToken(): string {
  let refreshToken = "";

  if (typeof window !== "undefined") {
    try {
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedUserData: UserData = JSON.parse(userData);
        refreshToken = parsedUserData.refreshToken;
      } else {
        console.log("No userData found in localStorage");
      }
    } catch (error) {
      console.error("Error parsing userData:", error);
    }
  }

  return refreshToken;
}

export { authToken, getAuthToken, getRefreshToken };
