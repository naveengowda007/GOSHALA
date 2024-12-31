import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { useDrawer } from "../context/DrawerContext";
import { useAuth } from "../context/AuthContext";

const { height: screenHeight } = Dimensions.get("window");

const Header = ({ showProfileIcon = true, onBackPress }) => {
  const router = useRouter();
  const { openDrawer, closeDrawer } = useDrawer();
  const { LogoutUser } = useAuth();

  return (
    <View style={styles.container}>
      {/* Profile Icon */}
      {showProfileIcon ? (
        <TouchableOpacity
          style={styles.profileIconContainer}
          onPress={() =>
            openDrawer(
              <View style={{ padding: 20 }}>
                <TouchableOpacity
                  style={styles.logoContainer_Drawer}
                  onPress={() => {
                    router.push("/HomePage");
                    closeDrawer(); // Close the drawer
                  }}
                >
                  <Image
                    source={require("../assets/images/Goshala_Logo_bg.png")}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginVertical: 10,
                    }}
                  >
                    GOSHALA
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.drawerButton}
                  onPress={() => {
                    console.log("Dashboard");
                    router.push("/HomePage");
                    closeDrawer(); // Close the drawer
                  }}
                >
                  <FontAwesome
                    name="dashboard"
                    size={20}
                    color="white"
                    style={styles.icon}
                  />
                  <Text style={styles.drawerButtonText}>Dashboard</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.drawerButton}
                  onPress={() => {
                    router.push("/HomePage/Members");
                    console.log("Members");
                    closeDrawer(); // Close the drawer
                  }}
                >
                  <FontAwesome
                    name="users"
                    size={20}
                    color="white"
                    style={styles.icon}
                  />
                  <Text style={styles.drawerButtonText}>Members</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.drawerButton}
                  onPress={() => {
                    router.push("/HomePage/TripDetails");
                    console.log("Trip Details");
                    closeDrawer(); // Close the drawer
                  }}
                >
                  <FontAwesome
                    name="bus"
                    size={20}
                    color="white"
                    style={styles.icon}
                  />
                  <Text style={styles.drawerButtonText}>Trip Details</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.drawerButton}
                  onPress={() => {
                    router.push("/HomePage/Bookings");
                    console.log("Bookings");
                    closeDrawer(); // Close the drawer
                  }}
                >
                  <FontAwesome
                    name="calendar-check-o"
                    size={20}
                    color="white"
                    style={styles.icon}
                  />
                  <Text style={styles.drawerButtonText}>Bookings</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.drawerButton}
                  onPress={() => {
                    router.push("/HomePage/Payments");
                    console.log("Payments");
                    closeDrawer(); // Close the drawer
                  }}
                >
                  <FontAwesome
                    name="rupee"
                    size={20}
                    color="white"
                    style={styles.icon}
                  />
                  <Text style={styles.drawerButtonText}>Payments</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.drawerButton}
                  onPress={() => {
                    router.push("/HomePage/Announcements");
                    console.log("Announcements");
                    closeDrawer(); // Close the drawer
                  }}
                >
                  <FontAwesome
                    name="bullhorn"
                    size={20}
                    color="white"
                    style={styles.icon}
                  />
                  <Text style={styles.drawerButtonText}>Announcements</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.drawerButton, { backgroundColor: "#FF5C5C" }]}
                  onPress={async () => {
                    try {
                      closeDrawer();
                      await LogoutUser(); // Call LogoutUser to clear token and user state
                      router.push("/Login"); // Navigate to the desired route after logout
                    } catch (error) {
                      console.error("Error during logout:", error);
                    }
                  }}
                >
                  <FontAwesome
                    name="sign-out"
                    size={20}
                    color="white"
                    style={styles.icon}
                  />
                  <Text style={styles.drawerButtonText}>Logout</Text>
                </TouchableOpacity>
              </View>
            )
          }
        >
          <FontAwesome name="user" size={40} color="black" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.backIconContainer}
          onPress={onBackPress}
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
      )}

      {/* Logo */}
      <TouchableOpacity
        style={styles.logoContainer}
        onPress={() => router.push("/HomePage")}
      >
        <Image
          source={require("../assets/images/Goshala_Logo_bg.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Back Icon */}
      <TouchableOpacity style={styles.backIconContainer}>
        {/* <AntDesign name="right" size={24} color="black" /> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: screenHeight * 0.1, // Fixed height ratio
    paddingHorizontal: 10,
    backgroundColor: "#F5F5F5", // Adjust background color as needed
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backIconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  logoContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer_Drawer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: "100%",
    width: "100%",
  },
  profileIconContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingRight: 15,
  },
  drawerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2eb67d",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 15,
    justifyContent: "flex-start",
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  icon: {
    marginRight: 15,
  },
  drawerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Header;
