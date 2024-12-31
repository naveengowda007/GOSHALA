import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
  ActivityIndicator,
} from "react-native";
import Header from "../../components/Header";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAuth } from "../../context/AuthContext";
import Toast from "react-native-toast-message";

const BookingsPage = () => {
  const { token, user } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const rootOrigin = process.env.EXPO_PUBLIC_IP_ADDRESS; // Replace with your actual API base URL

  const fetchBookings = async () => {
    try {
      const response = await fetch(
        `${rootOrigin}/api/v1/users/data/getUserTravelBookings`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Verify the structure of the data here
        setBookings(data || []);
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
    fetchBookings();
  }, []);

  const handleBackPress = () => {
    router.back();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderBookingItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.text}>
        <Text style={styles.label}>Booking ID: </Text>
        {item.booking_id || "Not Available"}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Trip ID: </Text>
        {item.trip_id || "Not Available"}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>User ID: </Text>
        {item.user_id || "Not Available"}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Member ID: </Text>
        {item.member_id || "Not Available"}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Paid Amount: </Text>
        {item.paid_amount || "Not Available"}
      </Text>
    </View>
  );

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
          <Text style={styles.header}>Bookings</Text>
        </View>

        {/* Search Bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search packages"
          placeholderTextColor="#999"
        />

        {/* Add Booking Button */}
        <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
          <Text style={styles.addButtonText}>Add Booking</Text>
        </TouchableOpacity>

        {/* Loading, Error Handling, and Bookings List */}
        {loading ? (
          <ActivityIndicator size="large" color="green" />
        ) : error ? (
          <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
        ) : (
          <FlatList
            data={bookings}
            keyExtractor={(item) => item.booking_id.toString()}
            renderItem={renderBookingItem}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Modal for Add Booking */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalHeader}>Add Booking</Text>

              <TextInput
                style={styles.modalInput}
                placeholder="Member ID"
                placeholderTextColor="#999"
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Trip ID"
                placeholderTextColor="#999"
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Paid Amount"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />

              <View style={styles.modalActions}>
                <Button title="Cancel" onPress={toggleModal} color="#888" />
                <Button title="Save" onPress={() => {}} color="#2eb67d" />
              </View>
            </View>
          </View>
        </Modal>
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
  addButton: {
    backgroundColor: "#2eb67d",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2eb67d",
    marginBottom: 16,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    fontSize: 16,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default BookingsPage;
