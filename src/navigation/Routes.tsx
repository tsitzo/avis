import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { AppStack } from "./AppStack";

export const Routes = () => {
  return (
    <>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
      <StatusBar />
    </>
  );
};
