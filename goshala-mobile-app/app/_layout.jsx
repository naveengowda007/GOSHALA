import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext"; // Adjust the path if needed
import { DrawerProvider } from "../context/DrawerContext"; // Path to your DrawerContext
import GlobalDrawer from "../components/GlobalDrawer"; // Path to your GlobalDrawer component


export default function RootLayout() {
  return (
    <AuthProvider>
      <DrawerProvider>
        <GlobalDrawer />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </DrawerProvider>
    </AuthProvider>
  );
}
