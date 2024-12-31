import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Header from "../../components/Header";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Toast from "react-native-toast-message";
import { useAuth } from "../../context/AuthContext";

const App = () => {
  const { token } = useAuth();
  const router = useRouter();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const rootOrigin = process.env.EXPO_PUBLIC_IP_ADDRESS; // Replace with your actual API base URL

  // Fetch Payments
  const fetchPayments = async () => {
    try {
      const response = await fetch(
        `${rootOrigin}/api/v1/users/data/getPayments`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Verify the structure of the data
        setPayments(data || []);
        Toast.show({
          type: "success",
          position: "top",
          text1: "Payments fetched successfully",
        });
      } else {
        throw new Error("Failed to fetch payments");
      }
    } catch (err) {
      setError(err.message);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error fetching payments",
        text2: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchPayments();
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedCard(null);
  };

  const handleUpdate = () => {
    alert("Booking updated successfully!");
    handleModalClose();
  };

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
          <Text style={styles.title}>Payments</Text>
        </View>

        {/* Loading and Error Handling */}
        {loading ? (
          <ActivityIndicator size="large" color="green" />
        ) : error ? (
          <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.cardGrid}>
            {payments.map((item) => (
              <TouchableOpacity
                key={item.payment_id} // Use payment_id from API response
                style={styles.card}
                onPress={() => handleCardClick(item)}
              >
                <Text style={styles.cardText}>
                  Payment Id: {item.payment_id}{" "}
                  {/* payment_id from API response */}
                </Text>
                <Text style={styles.cardText}>
                  Amount: {item.payment_amount}{" "}
                  {/* payment_amount from API response */}
                </Text>
                <Text style={styles.cardText}>
                  Date: {new Date(item.payment_date).toLocaleString()}{" "}
                  {/* payment_date from API response */}
                </Text>
                <Text style={styles.cardText}>
                  Booking Id: {item.booking_id}{" "}
                  {/* booking_id from API response */}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Modal for Update Booking */}
        {modalVisible && selectedCard && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible}
            onRequestClose={handleModalClose}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Update Booking</Text>

                <Text style={styles.label}>Payment ID</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Payment ID"
                  value={selectedCard.payment_id.toString()} // payment_id from selectedCard
                  editable={false}
                />

                <Text style={styles.label}>Payment Amount</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Payment Amount"
                  defaultValue={selectedCard.payment_amount.toString()} // payment_amount from selectedCard
                />

                <Text style={styles.label}>Booking ID</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Booking ID"
                  defaultValue={selectedCard.booking_id.toString()} // booking_id from selectedCard
                />

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.btnUpdate}
                    onPress={handleUpdate}
                  >
                    <Text style={styles.btnText}>Update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnCancel}
                    onPress={handleModalClose}
                  >
                    <Text style={styles.btnText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
    marginBottom: 20,
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#2eb67d",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: "48%",
  },
  cardText: {
    color: "white",
    fontSize: 16,
    marginBottom: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  btnUpdate: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  btnCancel: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnText: {
    color: "white",
    fontSize: 16,
  },
});

export default App;
