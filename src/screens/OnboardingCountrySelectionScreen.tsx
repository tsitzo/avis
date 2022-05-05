import React, { FC, useContext } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import SafeArea from "../components/layout/SafeArea";
import Typography from "../components/text/Typography";
import Spacer from "../components/layout/Spacer";

import { SettingsContext } from "../context/SettingsContext";
import { AppStackParams } from "../types/navigation";
interface IOnboardingCountrySelectionScreen {
  navigation: NativeStackNavigationProp<
    AppStackParams,
    "OnboardingCountrySelectionScreen"
  >;
}

const OnboardingCountrySelectionScreen: FC<
  IOnboardingCountrySelectionScreen
> = ({ navigation }) => {
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
                    color={
                      selectedCountry.name === item.name
                        ? colors.primary
                        : colors.subtext
                    }
                    size={18}
                  />
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
            onPress={() =>
              selectCountry.name !== "" &&
              navigation.push("OnboardingCategoriesSelectionScreen")
            }
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeArea>
  );
};

export default OnboardingCountrySelectionScreen;

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
