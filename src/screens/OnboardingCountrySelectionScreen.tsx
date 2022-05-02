import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import SafeArea from "../components/layout/SafeArea";
import { SettingsContext } from "../context/SettingsContext";
import Typography from "../components/text/Typography";
import Spacer from "../components/layout/Spacer";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const OnboardingCountrySelectionScreen = () => {
  const { countries, selectedCountry, selectCountry } =
    useContext(SettingsContext);
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
            data={countries}
            renderItem={({ item, index }) => (
              <View
                key={item.iso}
                style={[
                  styles.selectionTile,
                  {
                    borderBottomColor: colors.separator,
                    borderBottomWidth: index + 1 < countries.length ? 0.17 : 0,
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => selectCountry(item)}
                  style={styles.selectionTileContent}
                >
                  <View style={styles.selectionTileContentLeft}>
                    <Image
                      source={item.flag}
                      style={{ maxWidth: 30, width: 30 }}
                      resizeMode="cover"
                    />
                    <Spacer x={10} />
                    <View>
                      <Typography variant="bold" style={styles.capitalize}>
                        {item.name}
                      </Typography>
                      <Typography
                        color="subtext"
                        style={styles.capitalize}
                        size={14}
                      >
                        {item.language}{" "}
                      </Typography>
                    </View>
                  </View>
                  {selectedCountry.name === item.name && (
                    <Ionicons
                      name="checkmark"
                      color={colors.primary}
                      size={18}
                    />
                  )}
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.iso}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={styles.bottomWrapper}>
          <TouchableOpacity
            style={[
              styles.fab,
              {
                backgroundColor:
                  selectedCountry.name === "" ? "grey" : colors.primary,
              },
            ]}
            // onPress={() => navigation.push("CategoriesSelectionScreen")}
          >
            <Typography>Next</Typography>
          </TouchableOpacity>
        </View>
      </View>
    </SafeArea>
  );
};

export default OnboardingCountrySelectionScreen;

const styles = StyleSheet.create({
  topWrapper: { flex: 1 },
  bottomWrapper: { height: 70, justifyContent: "center", alignItems: "center" },
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
  selectionTileContentLeft: { flexDirection: "row", alignItems: "center" },
  capitalize: { textTransform: "capitalize" },
});
