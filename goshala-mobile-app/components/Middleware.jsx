import { useAuth } from "../context/AuthContext";
import { useRouter } from "expo-router";
import React from "react";
import { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";

const Middleware = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/Login"); // Redirect to login if not logged in
    }
  }, [isLoggedIn, router]); // Effect runs when `isLoggedIn` changes

  if (!isLoggedIn) {
    return (
          <View>
            <Image
            source={require("../assets/images/analysis_image.png")}
            style={styles.image}
            resizeMode="contain"
          />
          </View>
        );
  }

  return children; // Render the protected page if logged in
};

export const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
  },
});

export default Middleware;
