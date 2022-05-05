import React from "react";

import { useTheme } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Ionicons } from "@expo/vector-icons";

import { AppTabsParams } from "../types/navigation";
import { HomeScreen, SettingsScreen, MyNewsScreen } from "../screens";

const HomeStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

const HomeScreenStack = () => {
  const { colors } = useTheme();

  const { Screen, Navigator } = HomeStack;

  return (
    <Navigator
      screenOptions={{
        headerLargeTitle: true,
        headerLargeStyle: { backgroundColor: colors.background },
        headerStyle: { backgroundColor: colors.card },

        headerLargeTitleShadowVisible: false,
      }}
    >
      <Screen name="AVIS" component={HomeScreen} />
    </Navigator>
  );
};

const MyNewsScreenStack = () => {
  const { colors } = useTheme();

  const { Screen, Navigator } = HomeStack;

  return (
    <Navigator
      screenOptions={{
        headerLargeTitle: true,
        headerLargeStyle: { backgroundColor: colors.background },
        headerStyle: { backgroundColor: colors.card },

        headerLargeTitleShadowVisible: false,
      }}
    >
      <Screen name="My News" component={MyNewsScreen} />
    </Navigator>
  );
};

const SettingsScreenStack = () => {
  const { colors } = useTheme();
  const { Screen, Navigator } = SettingsStack;

  return (
    <Navigator
      screenOptions={{
        headerLargeTitle: true,
        headerLargeStyle: { backgroundColor: colors.background },
        headerStyle: { backgroundColor: colors.card },

        headerLargeTitleShadowVisible: false,
      }}
    >
      <Screen name="Settings" component={SettingsScreen} />
    </Navigator>
  );
};

const Tabs = createBottomTabNavigator<AppTabsParams>();

export const AppTabs = () => {
  const { colors } = useTheme();
  const { Screen, Navigator } = Tabs;

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        // headerTransparent: false,
        tabBarStyle: {
          backgroundColor: colors.card,
        },
        tabBarShowLabel: false,
      }}
    >
      <Screen
        name="HomeScreen"
        component={HomeScreenStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "md-home" : "md-home-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Screen
        name="MyNewsScreen"
        component={MyNewsScreenStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "md-newspaper" : "md-newspaper-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />

      <Screen
        name="SettingsScreen"
        component={SettingsScreenStack}
        options={{
          tabBarLabel: "Settings",

          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "md-settings" : "md-settings-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Navigator>
  );
};
