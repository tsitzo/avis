import React, { useContext } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { SettingsContext } from "../context/SettingsContext";
import { getCategoryIcon } from "../utils/getCategoryIcon";
import SafeArea from "../components/layout/SafeArea";
import Spacer from "../components/layout/Spacer";
import Typography from "../components/text/Typography";

const SettingsCategoriesSelectionScreen = () => {
  const {
    categories,
    selectedCategories,
    setFirstVisitFalse,
    addCategory,
    removeCategory,
  } = useContext(SettingsContext);
  const { colors } = useTheme();
  return (
    <SafeArea>
      <View style={styles.page}>
        <FlatList
          contentContainerStyle={[
            styles.optionContainer,
            { backgroundColor: colors.card },
          ]}
          data={categories}
          renderItem={({ item, index }) => (
            <View
              key={item.name}
              style={[
                styles.selectionTile,
                {
                  borderBottomColor: colors.separator,
                  borderBottomWidth: index + 1 < categories.length ? 0.17 : 0,
                },
              ]}
            >
              <TouchableOpacity
                onPress={() =>
                  selectedCategories.find((c) => c.name === item.name)
                    ? removeCategory(item)
                    : addCategory(item)
                }
                style={styles.selectionTileContent}
              >
                <View style={styles.selectionTileContentLeft}>
                  {getCategoryIcon(item.name, colors.primary)}
                  <Spacer x={10} />
                  <View>
                    <Typography variant="bold" style={styles.capitalize}>
                      {item.name}
                    </Typography>
                  </View>
                </View>
                <Ionicons
                  name={
                    selectedCategories.find((c) => c.name === item.name)
                      ? "radio-button-on"
                      : "radio-button-off"
                  }
                  color={
                    selectedCategories.find((c) => c.name === item.name)
                      ? colors.primary
                      : colors.subtext
                  }
                  size={18}
                />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeArea>
  );
};

export default SettingsCategoriesSelectionScreen;

const styles = StyleSheet.create({
  selectionTileContentLeft: { flexDirection: "row", alignItems: "center" },
  capitalize: { textTransform: "capitalize" },
  page: { flex: 1, padding: 15 },
  optionContainer: { paddingHorizontal: 15, borderRadius: 10 },

  selectionTile: {
    paddingVertical: 15,
  },
  selectionTileContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
