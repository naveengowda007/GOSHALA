import React from "react";
import { StyleSheet, View, Text, ScrollView, Dimensions, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const rootOrigin = process.env.EXPO_PUBLIC_IP_ADDRESS;

export default function SignUp() {
  const router = useRouter();

  const signUpSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSignUp = async (values) => {
    try {
      console.log("Sending data to the API:", values);
      Toast.show({
        type: "info",
        text1: "Processing...",
        text2: "Please wait.",
      });

      const response = await fetch(`${rootOrigin}/api/v1/users/login/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: values.username,
          email: values.email,
          user_mobile: values.phoneNumber,
          password: values.password,
        }),
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Signup successful!",
        });
        router.push("/HomePage");
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: result.message || "Something went wrong!",
        });
      }
    } catch (error) {
      console.error("Error during signup:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Network error occurred!",
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/analysis_image.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <Formik
          initialValues={{
            username: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={signUpSchema}
          onSubmit={handleSignUp}
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
                label="Username"
                mode="outlined"
                placeholder="Enter your username"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                error={touched.username && errors.username}
                style={styles.input}
              />
              {touched.username && errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}

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
                label="Phone Number"
                mode="outlined"
                placeholder="Enter your phone number"
                keyboardType="numeric"
                onChangeText={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
                value={values.phoneNumber}
                error={touched.phoneNumber && errors.phoneNumber}
                style={styles.input}
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
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

              <TextInput
                label="Confirm Password"
                mode="outlined"
                placeholder="Confirm your password"
                secureTextEntry
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                error={touched.confirmPassword && errors.confirmPassword}
                style={styles.input}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}

              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.submitButton}
              >
                Sign Up
              </Button>
              <View style={styles.bottomLinks}>
                <Button
                  mode="outlined"
                  style={styles.linkButton}
                  onPress={() => {
                    router.push("/Login");
                  }}
                >
                  Already Existing User
                </Button>
              </View>
            </>
          )}
        </Formik>
      </View>
      <Toast />
    </ScrollView>
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
  submitButton: {
    marginTop: 20,
    backgroundColor: "#1abc9c",
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
