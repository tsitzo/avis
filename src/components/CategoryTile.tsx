import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Category } from "../types/types";
import Typography from "./text/Typography";
import { getCategoryIcon } from "../utils/getCategoryIcon";
import { useTheme } from "@react-navigation/native";
import Spacer from "./layout/Spacer";

interface ICategoryTileProps {
  category: Category;
}
const CategoryTile: FC<ICategoryTileProps> = ({ category }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.tile, { backgroundColor: colors.card }]}>
      <Typography variant="bold" style={styles.capitalize}>
        {category.name}
      </Typography>
      <Spacer y={10} />
      {getCategoryIcon(category.name, colors.primary)}
    </View>
  );
};

export default CategoryTile;

const styles = StyleSheet.create({
  tile: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 5,
  },
  capitalize: {
    textAlign: "center",
    textTransform: "capitalize",
  },
});
