import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Header from "../../components/Header";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useAuth } from "../../context/AuthContext";

const rootOrigin = process.env.EXPO_PUBLIC_IP_ADDRESS;

const PackagesPage = () => {
 const { token, user } = useAuth();
  const router = useRouter();

  const [isModalVisible, setModalVisible] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [memeberGender, setMemeberGender] = useState("");
  const [memberAge, setMemberAge] = useState(0);
  const [contactNumber, setContactNumber] = useState("");
  const [members, setMembers] = useState([]); // To hold the fetched members
  const [loading, setLoading] = useState(false);


  const toggleModal = () => setModalVisible(!isModalVisible);
  const incrementAge = () => setMemberAge((prev) => prev + 1);
  const decrementAge = () => setMemberAge((prev) => (prev > 0 ? prev - 1 : 0));

  const handleBackPress = () => {
    router.back();
  };

  const handleAddMember = async () => {
    try {
      const payload = {
        member_name: memberName,
        memeber_gender: memeberGender,
        member_age: memberAge,
        member_contact_number: contactNumber,
        associated_user_id: user.empid,
      };

      const response = await fetch(
        `${rootOrigin}/api/v1/users/data/insertMembersList`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Toast.show({
          type: "success",
          position: "top",
          text1: "Member added successfully",
        });
        setModalVisible(false); // Close the modal
        fetchMembers(); // Refresh the members list
      } else {
        throw new Error(data.message || "Failed to add member");
      }
    } catch (error) {
      console.error("Error adding member:", error);
      Toast.show({
        type: "error",
        position: "top",
        text1: error.message,
      });
    }
  };


  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${rootOrigin}/api/v1/users/data/getMembersList?associated_user_id=${user.empid}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        setMembers(data); // Set the fetched members
        Toast.show({
          type: "success",
          position: "top",
          text1: "Members fetched successfully",
        });
      } else {
        throw new Error(data.message || "Failed to fetch members");
      }
    } catch (error) {
      console.error("Error fetching members:", error);
      Toast.show({
        type: "error",
        position: "top",
        text1: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

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
          <Text style={styles.header}>Members</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search packages"
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
            <Text style={styles.addButtonText}>Add Customer</Text>
          </TouchableOpacity>
        </View>
        <View>
          {loading ? (
            <Text style={styles.noCustomersText}>Loading...</Text>
          ) : members.length === 0 ? (
            <Text style={styles.noCustomersText}>No Customers available</Text>
          ) : (
            <FlatList
              data={members}
              keyExtractor={(item) => item.member_id.toString()}
              renderItem={({ item }) => (
                <View style={styles.memberCard}>
                  <Text style={styles.memberName}>{item.member_name}</Text>
                  <Text style={styles.memberDetail}>
                    Gender: {item.memeber_gender}
                  </Text>
                  <Text style={styles.memberDetail}>
                    Age: {item.member_age}
                  </Text>
                  <Text style={styles.memberDetail}>
                    Contact: {item.member_contact_number}
                  </Text>
                </View>
              )}
            />
          )}
        </View>
      </View>

      {/* Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Add Customer</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Member Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter member name"
                placeholderTextColor="#999"
                value={memberName}
                onChangeText={setMemberName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Member Gender</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={memeberGender}
                  style={styles.picker}
                  onValueChange={(value) => setMemeberGender(value)}
                >
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                </Picker>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Member Age</Text>
              <View style={styles.ageContainer}>
                <TouchableOpacity
                  style={styles.ageButton}
                  onPress={decrementAge}
                >
                  <Text style={styles.ageButtonText}>-</Text>
                </TouchableOpacity>
                <TextInput
                  style={[styles.input, styles.ageInput]}
                  value={String(memberAge)}
                  keyboardType="numeric"
                  onChangeText={(text) => setMemberAge(parseInt(text) || 0)}
                />
                <TouchableOpacity
                  style={styles.ageButton}
                  onPress={incrementAge}
                >
                  <Text style={styles.ageButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Contact Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter contact number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={contactNumber}
                onChangeText={setContactNumber}
              />
            </View>

            <TouchableOpacity
              style={styles.addCustomerButton}
              onPress={handleAddMember}
            >
              <Text style={styles.addCustomerButtonText}>Add Customer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    fontSize: 16,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#2eb67d",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
    marginTop: 16,
    backgroundColor: 'red'
  },
  noCustomersText: {
    fontSize: 16,
    color: "#333",
  },
  memberCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  memberName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  memberDetail: {
    fontSize: 16,
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2eb67d",
    marginBottom: 20,
  },
  inputGroup: {
    width: "100%",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  picker: {
    height: 55,
    width: "100%",
  },
  ageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ageInput: {
    textAlign: "center",
    flex: 1,
  },
  ageButton: {
    backgroundColor: "#2eb67d",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  ageButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  addCustomerButton: {
    backgroundColor: "#2eb67d",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
    width: 135,
  },
  addCustomerButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    justifyContent: "center",
    backgroundColor: "#2eb67d",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    width: 135,
  },
  cancelButtonText: {
    color: "#333",
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default PackagesPage;
