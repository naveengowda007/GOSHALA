import React, { useEffect, useState } from "react";
import { View, Dimensions, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { Image } from "expo-image";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function App() {
  const router = useRouter();
  const { isLoggedIn } = useAuth(); // Retrieve the login status from context
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // After 1 second, check the login status and redirect accordingly
      if (isLoggedIn) {
        router.replace("/HomePage");
      } else {
        router.replace("/Login");
      }
    }, 1000); // 1 second delay

    return () => clearTimeout(timeout); // Cleanup timeout on component unmount
  }, [isLoggedIn, router]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Image
          source={require("../assets/images/GoshalaLogo.png")}
          style={styles.logo}
          contentFit="contain"
          transition={1000}
        />
      ) : null}
      {/* Display the logo only during the 1-second loading period */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Soft background color
    paddingHorizontal: 20,
  },
  logo: {
    width: screenWidth * 0.8, // Responsive width for the logo
    height: screenHeight * 0.4, // Responsive height for the logo
    marginBottom: 40,
    borderRadius: 15,
    // borderWidth: 0,
    // borderColor: "#3498db",
    // shadowColor: "#2c3e50",
    // shadowOffset: { width: 0, height: 10 },
    // shadowOpacity: 0.2,
    // shadowRadius: 6,
  },
});
