import React, { FC } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { AppStackParams } from "../types/navigation";

import SafeArea from "../components/layout/SafeArea";
import Spacer from "../components/layout/Spacer";
import Typography from "../components/text/Typography";

interface ISettingsScreenProps {
  navigation: NativeStackNavigationProp<AppStackParams, "AppTabs">;
}

const SettingsScreen: FC<ISettingsScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <SafeArea>
      <ScrollView>
        <View style={[styles.itemsWrapper, { backgroundColor: colors.card }]}>
          <View
            style={[
              styles.selectionTile,

              {
                borderBottomColor: colors.separator,
              },
            ]}
          >
            <TouchableOpacity style={styles.selectionTileContent}>
              <Typography>Theme</Typography>
              <View style={styles.chevonWrapper}>
                <Typography color="subtext" style={styles.capitalize}>
                  {"theme"}
                </Typography>
                <Spacer x={10} />
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.subtext}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.selectionTile,
              styles.selectionTileBorder,

              {
                borderBottomColor: colors.separator,
              },
            ]}
          >
            <TouchableOpacity style={styles.selectionTileContent}>
              <Typography>Manage Interests</Typography>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.subtext}
              />
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.selectionTile,
              styles.selectionTileBorder,

              {
                borderBottomColor: colors.separator,
              },
            ]}
          >
            <TouchableOpacity style={styles.selectionTileContent}>
              <Typography>Countries</Typography>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.subtext}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.itemsWrapper, { backgroundColor: colors.card }]}>
          <View
            style={[
              styles.selectionTile,
              styles.selectionTileBorder,

              {
                borderBottomColor: colors.separator,
              },
            ]}
          >
            <TouchableOpacity style={styles.selectionTileContent}>
              <Typography>About</Typography>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.subtext}
              />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.selectionTile,
              styles.selectionTileBorder,

              {
                borderBottomColor: colors.separator,
              },
            ]}
          >
            <TouchableOpacity style={styles.selectionTileContent}>
              <Typography>Updates</Typography>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.subtext}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeArea>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  itemsWrapper: { margin: 15, paddingHorizontal: 15, borderRadius: 10 },
  selectionTile: {
    paddingVertical: 15,
  },
  selectionTileBorder: { borderBottomWidth: 0.17 },
  selectionTileContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chevonWrapper: { flexDirection: "row", alignItems: "center" },
  capitalize: { textTransform: "capitalize" },
});
