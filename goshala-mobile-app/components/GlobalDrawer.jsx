import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { useDrawer } from "../context/DrawerContext";
import AntDesign from "@expo/vector-icons/AntDesign";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const GlobalDrawer = () => {
  const { isDrawerOpen, drawerContent, closeDrawer } = useDrawer();
  const drawerAnim = React.useRef(new Animated.Value(screenWidth)).current;

  React.useEffect(() => {
    if (isDrawerOpen) {
      Animated.timing(drawerAnim, {
        toValue: screenWidth * 0.3,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(drawerAnim, {
        toValue: screenWidth,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  return (
    <Animated.View style={[styles.drawer, { right: drawerAnim }]}>
      <TouchableOpacity style={styles.drawerClose} onPress={closeDrawer}>
        <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.drawerContent}>
        {drawerContent || <Text style={styles.defaultText}>No Content</Text>}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: screenWidth * 0.7,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    padding: 20,
    zIndex: 1000, // Ensures it's above all other components
  },
  drawerClose: {
    alignSelf: "flex-end",
  },
  drawerContent: {
    marginTop: 20,
  },
  defaultText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
});

export default GlobalDrawer;
