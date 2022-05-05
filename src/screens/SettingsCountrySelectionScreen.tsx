import React, { useContext } from "react";
import {
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import { SettingsContext } from "../context/SettingsContext";
import SafeArea from "../components/layout/SafeArea";
import Spacer from "../components/layout/Spacer";
import Typography from "../components/text/Typography";

const SettingsCountrySelectionScreen = () => {
  const { countries, selectedCountry, selectCountry } =
    useContext(SettingsContext);
  const { colors } = useTheme();
  return (
    <SafeArea>
      <View style={styles.page}>
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
                      {item.language}
                    </Typography>
                  </View>
                </View>

                <Ionicons
                  name={
                    selectedCountry.name === item.name
                      ? "radio-button-on"
                      : "radio-button-off"
                  }
                  color={colors.primary}
                  size={18}
                />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.iso}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeArea>
  );
};

export default SettingsCountrySelectionScreen;

const styles = StyleSheet.create({
  page: { flex: 1, padding: 15 },

  optionContainer: { paddingHorizontal: 15, borderRadius: 10 },
  capitalize: { textTransform: "capitalize" },
  selectionTile: {
    paddingVertical: 15,
  },
  selectionTileContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectionTileContentLeft: { flexDirection: "row", alignItems: "center" },
});
