import { View, Text } from "react-native";
import React from "react";
import { Routes } from "./src/navigation/Routes";
import { SettingsContextProvider } from "./src/context/SettingsContext";
import { AppearanceProvider } from "react-native-appearance";

const App = () => {
  return (
    <AppearanceProvider>
      <SettingsContextProvider>
        <Routes />
      </SettingsContextProvider>
    </AppearanceProvider>
  );
};

export default App;
