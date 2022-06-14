import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Category } from "../../types/types";
import Typography from "../text/Typography";
import { getCategoryIcon } from "../../utils/getCategoryIcon";
import { useTheme } from "@react-navigation/native";
import Spacer from "../layout/Spacer";

interface ICategoryTileProps {
  category: Category;
}

const CategoryTile: FC<ICategoryTileProps> = ({ category }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.wrapper, { backgroundColor: colors.card }]}>
      <Typography variant="bold" style={styles.capitalize}>
        {category.name}
      </Typography>
      <Spacer y={10} />
      {getCategoryIcon(category.name, colors.primary, 1.5)}
    </View>
  );
};

export default CategoryTile;

const styles = StyleSheet.create({
  wrapper: {
    height: Dimensions.get("window").height / 4,
    paddingVertical: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  capitalize: {
    textTransform: "capitalize",
    textAlign: "center",
  },
});
