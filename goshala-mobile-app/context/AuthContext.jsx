import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Store token and user in AsyncStorage and update state
  const storeTokenAndUser = async (serverToken, userData) => {
    try {
      setToken(serverToken); // Update token state
      setUser(userData); // Update user state

      // Store them in AsyncStorage
      await AsyncStorage.setItem("token", serverToken);
      await AsyncStorage.setItem("user", JSON.stringify(userData));

      console.log("Token stored and state updated:", serverToken); // Log after state updates
    } catch (error) {
      console.error("Error storing token and user:", error);
    }
  };

  // Remove token and user from AsyncStorage and clear state
  const LogoutUser = async () => {
    try {
      setToken(null);
      setUser(null);
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      console.log("User logged out, token and user removed.");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Fetch token and user from AsyncStorage on app load
  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const storedUser = await AsyncStorage.getItem("user");

        if (storedToken) {
          setToken(storedToken);
        }
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error fetching auth data:", error);
      }
    };

    fetchAuthData();
  }, []);

  // Log the token whenever it changes
  useEffect(() => {
    if (token) {
      console.log("Updated Token:", token); // Log when token state is updated
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        storeTokenAndUser,
        LogoutUser,
        user,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};
