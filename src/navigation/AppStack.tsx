import React, { useContext } from "react";
import { useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";

import { AppStackParams } from "../types/navigation";
import { AppTabs } from "./AppTabs";
import {
  OnboardingCategoriesSelectionScreen,
  OnboardingCountrySelectionScreen,
  OnboardingWelcomeScreen,
} from "../screens";

const Stack = createNativeStackNavigator<AppStackParams>();

export const AppStack = () => {
  const { colors } = useTheme();

  const isFirstVisit = false;
  const isFirstVisitLoading = false;

  if (isFirstVisitLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={200} color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerLargeStyle: { backgroundColor: colors.background },
        headerStyle: { backgroundColor: colors.card },
        headerShadowVisible: false,
        headerTransparent: true,
      }}
    >
      {isFirstVisit ? (
        <>
          <Stack.Screen
            name="OnboardingWelcomeScreen"
            component={OnboardingWelcomeScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="OnboardingCountrySelectionScreen"
            component={OnboardingCountrySelectionScreen}
            options={{ headerLargeTitle: true, headerTitle: "Coutries" }}
          />
          <Stack.Screen
            name="OnboardingCategoriesSelectionScreen"
            component={OnboardingCategoriesSelectionScreen}
            options={{ headerLargeTitle: true, headerTitle: "Categories" }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="AppTabs"
            component={AppTabs}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
