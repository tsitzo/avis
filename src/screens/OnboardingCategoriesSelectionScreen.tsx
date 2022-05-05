import React, { FC, useContext } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import SafeArea from "../components/layout/SafeArea";
import Typography from "../components/text/Typography";
import Spacer from "../components/layout/Spacer";

import { SettingsContext } from "../context/SettingsContext";
import { AppStackParams } from "../types/navigation";
import { getCategoryIcon } from "../utils/getCategoryIcon";
interface IOnboardingCategoriesSelectionScreen {
  navigation: NativeStackNavigationProp<
    AppStackParams,
    "OnboardingCategoriesSelectionScreen"
  >;
}

const OnboardingCategoriesSelectionScreen: FC<
  IOnboardingCategoriesSelectionScreen
> = ({ navigation }) => {
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
        <View style={styles.topWrapper}>
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

        <View style={styles.bottomWrapper}>
          <TouchableOpacity
            disabled={selectedCategories.length === 0}
            style={[
              styles.fab,
              {
                backgroundColor:
                  selectedCategories.length === 0 ? "grey" : colors.primary,
              },
            ]}
            onPress={() =>
              selectedCategories.length > 0 && setFirstVisitFalse()
            }
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeArea>
  );
};

export default OnboardingCategoriesSelectionScreen;

const styles = StyleSheet.create({
  topWrapper: { flex: 1 },
  bottomWrapper: {
    height: 70,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    padding: 13,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
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
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  selectionTileContentLeft: { flexDirection: "row", alignItems: "center" },
  capitalize: { textTransform: "capitalize" },
});
