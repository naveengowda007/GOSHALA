import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Header from "../../components/Header";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAuth } from "../../context/AuthContext";
import Toast from "react-native-toast-message";

const PackagesPage = () => {
  const { token, user } = useAuth();
  const router = useRouter();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const rootOrigin = process.env.EXPO_PUBLIC_IP_ADDRESS; // Replace with your actual API base URL

  const fetchTrips = async () => {
    try {
      const response = await fetch(`${rootOrigin}/api/v1/users/data/getTrips`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTrips(data);
        Toast.show({
          type: "success",
          position: "top",
          text1: "Trip Details fetched successfully",
        });
      } else {
        throw new Error(data.message || "Failed to fetch Trip Details");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Header showProfileIcon={true} onBackPress={handleBackPress} />
      <View style={{ padding: 15 }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={handleBackPress}
          >
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.header}>Trip Details</Text>
        </View>

        {/* Search Bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search packages"
          placeholderTextColor="#999"
        />

        {/* Loading and Error Handling */}
        {loading ? (
          <ActivityIndicator size="large" color="green" />
        ) : error ? (
          <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
        ) : (
          /* Packages List */
          <FlatList
            data={trips}
            keyExtractor={(item) => item.trip_id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.text}>
                  <Text style={styles.label}>From: </Text>
                  {item.trip_from}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>To: </Text>
                  {item.trip_to}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Intermediate Stops: </Text>
                  {item.intermideate_stops}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Start Date: </Text>
                  {new Date(item.start_date).toLocaleDateString()}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>End Date: </Text>
                  {new Date(item.end_date).toLocaleDateString()}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Price: </Text>₹{item.price}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Days Count: </Text>
                  {item.days_count}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Trip Type: </Text>
                  {item.trip_type}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Trip Status: </Text>
                  {item.trip_status}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Trip Descriptions: </Text>
                  {item.trip_descriptions}
                </Text>
              </View>
            )}
          />
        )}
      </View>
      {/* Toast */}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    fontSize: 16,
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#2eb67d",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 4,
  },
  label: {
    fontWeight: "bold",
  },
});

export default PackagesPage;
