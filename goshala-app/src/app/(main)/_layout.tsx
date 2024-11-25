import { Stack } from "expo-router";

const MainLayout = () => {
  return (
    <Stack>
      {/* Home Screen */}
      <Stack.Screen 
        name="home" 
        options={{
          headerShown: false, // Show or hide the header
          title: "Home",     // Set the header title
          headerStyle: { backgroundColor: "green" }, // Customize header background color
          headerTintColor: "#fff", // Customize header text/icon color
        }} 
      />
    </Stack>
  );
};

export default MainLayout;
