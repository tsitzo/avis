import React, { useContext } from "react";
import { useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";

import { AppStackParams } from "../types/navigation";
import { AppTabs } from "./AppTabs";
import {
  BookmarkedNewsScreen,
  OnboardingCategoriesSelectionScreen,
  OnboardingCountrySelectionScreen,
  OnboardingWelcomeScreen,
  SettingsBrowserelectionScreen,
  SettingsCategoriesSelectionScreen,
  SettingsCountrySelectionScreen,
  SettingsThemeSelectionScreen,
} from "../screens";
import { SettingsContext } from "../context/SettingsContext";

const Stack = createNativeStackNavigator<AppStackParams>();

export const AppStack = () => {
  const { colors } = useTheme();
  const { Navigator, Screen } = Stack;

  const { isFirstVisit, isFirstVisitLoading } = useContext(SettingsContext);

  if (isFirstVisitLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={200} color={colors.primary} />
      </View>
    );
  }

  return (
    <Navigator
      screenOptions={{
        headerLargeStyle: { backgroundColor: colors.background },
        headerStyle: { backgroundColor: colors.card },
        headerShadowVisible: false,
        headerTransparent: true,
      }}
    >
      {isFirstVisit ? (
        <>
          <Screen
            name="OnboardingWelcomeScreen"
            component={OnboardingWelcomeScreen}
            options={{ headerShown: false }}
          />

          <Screen
            name="OnboardingCountrySelectionScreen"
            component={OnboardingCountrySelectionScreen}
            options={{ headerLargeTitle: true, headerTitle: "Select Country" }}
          />
          <Screen
            name="OnboardingCategoriesSelectionScreen"
            component={OnboardingCategoriesSelectionScreen}
            options={{
              headerLargeTitle: true,
              headerTitle: "Select Categories",
            }}
          />
        </>
      ) : (
        <>
          <Screen
            name="AppTabs"
            component={AppTabs}
            options={{ headerShown: false }}
          />
          <Screen
            name="SettingsThemeSelectionScreen"
            component={SettingsThemeSelectionScreen}
            options={{
              headerLargeTitle: true,
              headerTitle: "Select Theme",
            }}
          />
          <Screen
            name="SettingsCountrySelectionScreen"
            component={SettingsCountrySelectionScreen}
            options={{
              headerLargeTitle: true,
              headerTitle: "Select Country",
            }}
          />
          <Screen
            name="SettingsCategoriesSelectionScreen"
            component={SettingsCategoriesSelectionScreen}
            options={{
              headerLargeTitle: true,
              headerTitle: "Select Categories",
            }}
          />
          <Screen
            name="SettingsBrowserSelectionScreen"
            component={SettingsBrowserelectionScreen}
            options={{
              headerLargeTitle: true,
              headerTitle: "Select Browser",
            }}
          />
          <Screen
            name="BookmarkedNewsScreen"
            component={BookmarkedNewsScreen}
            options={{
              headerLargeTitle: true,
              headerTitle: "Saved News",
            }}
          />
        </>
      )}
    </Navigator>
  );
};
