import { View, Text } from "react-native";
import React from "react";
import { Routes } from "./src/navigation/Routes";
import { SettingsContextProvider } from "./src/context/SettingsContext";
import { AppearanceProvider } from "react-native-appearance";
import { BookmarksContextProvider } from "./src/context/BookmarksContext";

const App = () => {
  return (
    <AppearanceProvider>
      <BookmarksContextProvider>
        <SettingsContextProvider>
          <Routes />
        </SettingsContextProvider>
      </BookmarksContextProvider>
    </AppearanceProvider>
  );
};

export default App;
