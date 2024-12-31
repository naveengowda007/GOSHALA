import React from "react";
import { StyleSheet, Text, View, Linking } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import { useAuth } from "../context/AuthContext";
import { Image } from "expo-image";

const rootOrigin = process.env.EXPO_PUBLIC_IP_ADDRESS;

export default function App() {
  const router = useRouter();
  const { storeTokenAndUser } = useAuth();

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleLogin = async (values) => {
    try {
      console.log("Sending data to the API:", values);
      Toast.show({
        type: "info",
        text1: "Processing...",
        text2: "Please wait.",
      });

      const response = await fetch(`${rootOrigin}/api/v1/users/login/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log("API Response:", data);
      
      const serverToken = data.accessToken;
      const userData = data.user;

      if (response.ok) {
        await storeTokenAndUser(serverToken ,userData);
        Toast.show({
          type: "success",
          text1: "Login Successful",
          text2: `Welcome ${data.user.name}`,
          visibilityTime: 4000, // 4 seconds
        });

        setTimeout(() => {
          router.push("/HomePage");
        }, 1000);
      } else {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: data.message || "Something went wrong!",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Network error occurred!",
      });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/analysis_image.png")}
            style={styles.image}
            contentFit="contain"
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Login</Text>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <TextInput
                  label="Email"
                  mode="outlined"
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  error={touched.email && errors.email}
                  style={styles.input}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <TextInput
                  label="Password"
                  mode="outlined"
                  placeholder="Enter your password"
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  error={touched.password && errors.password}
                  style={styles.input}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={styles.loginButton}
                >
                  Login
                </Button>
              </>
            )}
          </Formik>

          <View style={styles.bottomLinks}>
            <Button
              mode="outlined"
              style={styles.linkButton}
              onPress={() => {
                // Open the URL in the device's default browser
                Linking.openURL("http://nodeserver.tumkurconnect.com/").catch(
                  (err) => console.error("Failed to open URL: ", err)
                );
              }}
            >
              Admin Login
            </Button>
            <Button
              mode="outlined"
              style={styles.linkButton}
              onPress={() => {
                router.push("/Signup");
              }}
            >
              Sign Up
            </Button>
          </View>
        </View>
      </View>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f6f6f6",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  imageContainer: {
    width: "100%",
    height: 300,
    marginBottom: 20,
  },
  image: {
    flex: 1,
    width: "100%",
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 12,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: "#2eb67d",
  },
  bottomLinks: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  linkButton: {
    flex: 1,
    marginHorizontal: 8,
    borderColor: "#2eb67d",
  },
});
