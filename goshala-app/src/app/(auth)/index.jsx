import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import  { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome"; // Import the eye icon from FontAwesome
import { useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();
  const [creds, setCreds] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // Track whether the password is visible

  const onChange = (name: string, value: string) => {
    setCreds((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    console.log("Login Credentials:", creds);
    router.push("/(main)/home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false} // Hide the scroll bar
          keyboardShouldPersistTaps="handled" // Ensures taps are handled even when the keyboard is open
        >
          <View style={styles.vw}>
            <Image
              source={require("../../constants/images/logo.png")}
              resizeMode="contain"
              style={styles.img}
            />
            <Text style={styles.title}>Let's Plan to Wander Around</Text>
            <Text style={styles.loginText}>Login</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="rgba(0,102,52,1)"
              onChangeText={(value) => onChange("email", value)}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]} // Ensure same width as email
                placeholder="Enter your password"
                placeholderTextColor="rgba(0,102,52,1)"
                secureTextEntry={!showPassword} // Toggle password visibility
                onChangeText={(value) => onChange("password", value)}
              />
              <TouchableOpacity
                style={styles.icon}
                onPress={() => setShowPassword(!showPassword)} // Toggle visibility
              >
                <Icon
                  name={showPassword ? "eye" : "eye-slash"}
                  size={20}
                  color="rgba(255,255,255,1)"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              // disabled={
              //   creds.email.length <= 0 || creds.password.length < 8 ? true : false
              // }
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // White background
  },
  vw: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 40, // Added padding for bottom to prevent content from being hidden behind keyboard
  },
  img: {
    width: 90,
    height: 88,
    margin: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600", // Corrected font weight
    margin: 10,
    marginBottom: 30,
    color: "rgba(0,0,0,1)",
  },
  loginText: {
    fontSize: 28,
    fontWeight: "600",
    color: "rgba(0,102,52,1)",
    marginBottom: 30,
  },
  input: {
    width: "90%", // Ensure width is consistent for both email and password
    height: 50,
    borderColor: "rgba(255,255,203,0.65)",
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: "rgba(0,102,52,1)",
    backgroundColor: "rgba(255,255,203,0.65)",
    elevation: 6,
  },
  passwordContainer: {
    width: "90%", // Same width as input to align with the email input
    position: "relative",
  },
  passwordInput: {
    width: "100%", // Ensures the input spans the entire width
  },
  icon: {
    position: "absolute",
    right: "5%", // Position the eye icon inside the input
    top: "20%", // Vertically center the icon
  },
  button: {
    backgroundColor: "rgba(0, 102, 52, 1)",
    paddingVertical: 10,
    width: "80%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "rgba(255,255,203,1)",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center", // Center the content vertically
  },
});

export default Index;
