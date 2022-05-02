import React from "react";

import { useTheme } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Ionicons } from "@expo/vector-icons";

import { AppTabsParams } from "../types/navigation";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";

const HomeStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

const HomeScreenStack = () => {
  const { colors } = useTheme();

  const { Screen, Navigator } = HomeStack;

  return (
    <Navigator>
      <Screen name="GGames" component={HomeScreen} />
    </Navigator>
  );
};

const SettingsScreenStack = () => {
  const { colors } = useTheme();
  const { Screen, Navigator } = SettingsStack;

  return (
    <Navigator>
      <Screen name="Settings" component={SettingsScreen} />
    </Navigator>
  );
};

const Tabs = createBottomTabNavigator<AppTabsParams>();

export const AppTabs = () => {
  const { colors } = useTheme();
  const { Screen, Navigator } = Tabs;

  return (
    <Navigator>
      <Screen
        name="HomeScreen"
        component={HomeScreenStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "md-home" : "md-home-outline"}
              size={20}
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
              size={20}
              color={color}
            />
          ),
        }}
      />
    </Navigator>
  );
};
