import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useContext } from "react";
import SafeArea from "../components/layout/SafeArea";
import { SettingsContext } from "../context/SettingsContext";
import CategoryTile from "../components/CategoryTile";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParams } from "../types/navigation";

interface IMyNewsScreenProps {
  navigation: NativeStackNavigationProp<AppStackParams, "AppTabs">;
}

const MyNewsScreen: FC<IMyNewsScreenProps> = ({ navigation }) => {
  const { selectedCategories } = useContext(SettingsContext);
  return (
    <SafeArea>
      <View style={styles.grid}>
        {selectedCategories.map((el, i) => (
          <TouchableOpacity
            onPress={() =>
              navigation.push("NewsByCategoryScreen", {
                category: el.name.charAt(0).toUpperCase() + el.name.slice(1),
              })
            }
            key={i}
            style={[
              styles.categoryTileWrapper,
              {
                width:
                  i === selectedCategories.length - 1 && i % 2 === 0
                    ? Dimensions.get("window").width
                    : Dimensions.get("window").width / 2,
              },
            ]}
          >
            <CategoryTile category={el} />
          </TouchableOpacity>
        ))}
      </View>
    </SafeArea>
  );
};

export default MyNewsScreen;

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap" },
  categoryTileWrapper: {
    padding: 10,
  },
});
