import { View, Text } from "react-native";
import React from "react";
import { Routes } from "./src/navigation/Routes";
import { SettingsContextProvider } from "./src/context/SettingsContext";

const App = () => {
  return (
    <SettingsContextProvider>
      <Routes />
    </SettingsContextProvider>
  );
};

export default App;
