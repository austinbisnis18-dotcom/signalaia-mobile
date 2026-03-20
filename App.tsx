import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainChatScreen from "./src/screens/MainChatScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <MainChatScreen />
    </SafeAreaProvider>
  );
}
