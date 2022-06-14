import React, { useContext } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SettingsContext } from "../context/SettingsContext";

import SafeArea from "../components/layout/SafeArea";
import Typography from "../components/text/Typography";
import CategoryTile from "../components/ui/CategoryTile";
import { sources } from "../data/sources";
import SourceTile from "../components/ui/SourceTile";

const MyNewsScreen = () => {
  const { selectedCategories, selectedCountry } = useContext(SettingsContext);

  return (
    <SafeArea>
      <View style={{ flex: 1 }}>
        <View style={styles.textWrapper}>
          <Typography variant="bold" size={24}>
            Categories
          </Typography>
        </View>
        <FlatList
          horizontal
          data={selectedCategories}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryWrapper}>
              <CategoryTile category={item} />
            </TouchableOpacity>
          )}
        />
        <View style={styles.textWrapper}>
          <Typography variant="bold" size={24}>
            Sources
          </Typography>
        </View>
        <FlatList
          style={{ marginBottom: 20 }}
          horizontal
          data={sources.filter(
            (source) => source.country === selectedCountry.iso
          )}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryWrapper}>
              <SourceTile source={item} />
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeArea>
  );
};

export default MyNewsScreen;

const styles = StyleSheet.create({
  categoryWrapper: {
    width: Dimensions.get("window").width / 2 - 10,

    padding: 5,
  },
  textWrapper: { padding: 10 },
});
