interface UrlConfig {
  BASE_URL: string;
  AUTH_URL: string;
}

interface Config {
  url: UrlConfig;
}

const prod: Config = {
  url: {
    BASE_URL: "https://test",
    AUTH_URL: "https://test",
  },
};

const dev: Config = {
  url: {
    BASE_URL: "http://157.173.105.37:8001",
    AUTH_URL: "http://157.173.105.37:8001/user/auth",
  },
};

export const config: Config =
  process.env.NODE_ENV === "development" ? dev : prod;

export const getAccessToken = (): string | undefined => {
  const token = localStorage.getItem("dlmp-access");

  if (!token) {
    return undefined;
  }

  try {
    return JSON.parse(token);
  } catch (error) {
    console.error("Error parsing token:", error);
    return undefined;
  }
};

export const getUser = (): UserProfile | null => {
  const user = localStorage.getItem("user-profile");
  if (user) {
    return JSON.parse(user) as UserProfile;
  }
  return null;
};
