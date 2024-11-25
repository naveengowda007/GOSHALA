import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
  } from "react-native";
  import React from "react";
  import Icon from "react-native-vector-icons/FontAwesome";
  import bgImage from "../../constants/images/bgImage.png";
  
  const Home = () => {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          {/* Top Half - Yellow Background */}
          <View style={styles.topHalf}>
            <View style={styles.headView}>
              <Text style={styles.greetingText}>Hello, User!</Text>
              <TouchableOpacity style={styles.button} activeOpacity={0.9}>
                <Icon name="user" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
  
            {/* Keyboard Avoiding View for the Search Input */}
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : undefined}
              style={styles.searchView}
            >
              <Icon
                style={styles.searchIcon}
                name="search"
                size={20}
                color="rgba(255,255,203,0.8)"
              />
              <TextInput
                style={styles.input}
                placeholder="Search"
                placeholderTextColor="rgba(255,255,203,0.65)"
              />
            </KeyboardAvoidingView>
  
            <View style={styles.cardView}>
              <View style={styles.topRow}>
                <TouchableOpacity style={styles.card} activeOpacity={0.9}>
                  <Text style={styles.cardText}>Trip Packages</Text>
                  <View style={styles.iconCircle}>
                    <Icon name="arrow-right" size={20} color="#fff" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} activeOpacity={0.9}>
                  <Text style={styles.cardText}>Travelled Trips</Text>
                  <View style={styles.iconCircle}>
                    <Icon name="arrow-right" size={20} color="#fff" />
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.card} activeOpacity={0.9}>
                <Text style={styles.cardText}>Payment Dues</Text>
                <View style={styles.iconCircle}>
                  <Icon name="arrow-right" size={20} color="#fff" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Bottom Half - Image */}
          <ImageBackground
            source={bgImage}
            style={styles.bottomHalf}
            resizeMode="cover"
          >
            {/* Any additional content for the bottom section can be added here */}
          </ImageBackground>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    topHalf: {
      backgroundColor: "rgba(255, 255, 203, 1)",
      height: "50%", // 50% of the screen height
      paddingTop: 20,
      position: "relative", // Allow cardView to overflow above the bgImage
      zIndex: 1, // Ensure it stays on top of the bgImage
    },
    cardView: {
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      gap: 10,
      position: "relative", // Allow overflow onto the image
      top: 20, // Ensure it’s not directly on top of the search bar
    },
    topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      gap: 10,
    },
    card: {
      backgroundColor: "#fff",
      width: "45%", // Cards on top row should be smaller to fit side by side
      height: 120,
      borderRadius: 15,
      padding: 10,
      justifyContent: "space-between",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
    cardText: {
      fontSize: 16,
      fontWeight: "bold",
      flexWrap: "wrap", // Allow text to wrap to the next line
    },
    iconCircle: {
      position: "absolute",
      bottom: 10,
      right: 10,
      backgroundColor: "rgba(0, 102, 52, 0.9)",
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    bottomHalf: {
      flex: 3, // Ensures the bottom half takes the remaining space
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "100%", // Ensure the height is 50% of the screen
    },
    headView: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    greetingText: {
      fontSize: 24,
      color: "#000",
    },
    button: {
      width: 40,
      height: 40,
      backgroundColor: "rgba(0, 102, 52, 0.7)",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
    },
    searchView: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(0, 102, 52, 0.7)",
      borderColor: "rgba(255,255,203,0.65)",
      borderWidth: 1,
      borderRadius: 30,
      marginHorizontal: 20,
      marginVertical: 10,
      paddingHorizontal: 15,
    },
    input: {
      flex: 1,
      height: 50,
      marginLeft: 10,
      color: "rgba(255,255,203,0.65)",
    },
    searchIcon: {
      marginLeft: 5,
    },
  });
  
  export default Home;
  