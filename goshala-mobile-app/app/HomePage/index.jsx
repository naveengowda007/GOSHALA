import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/Header";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";

const modules = [
  { title: "Members", icon: "users", route: "/HomePage/Members" },
  { title: "Trips", icon: "bus", route: "/HomePage/TripDetails" },
  { title: "Bookings", icon: "calendar-check-o", route: "/HomePage/Bookings" },
  { title: "Payments", icon: "rupee", route: "/HomePage/Payments" },
  {
    title: "Announcements",
    icon: "bullhorn",
    route: "/HomePage/Announcements",
  },
];

export default function Home() {
  const router = useRouter(); // Hook for navigation in Expo Router

  return (
    <View style={styles.container}>
      <Header showProfileIcon={true} />
      <ScrollView contentContainerStyle={styles.mainContent}>
        {modules.map((module, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => router.push(module.route)} // Navigate to route
          >
            <Icon name={module.icon} size={40} color="white" />
            <Text style={styles.cardText}>{module.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContent: {
    flexGrow: 1,
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  card: {
    backgroundColor: "#2eb67d",
    borderRadius: 8,
    padding: 20,
    margin: 10,
    width: "30%",
    minWidth: 150,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardText: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },
});
