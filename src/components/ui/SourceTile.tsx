import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";

import Typography from "../text/Typography";

import { useTheme } from "@react-navigation/native";
import Spacer from "../layout/Spacer";
import { Source } from "../../types/types";

interface ISourceTileProps {
  source: Source;
}

const SourceTile: FC<ISourceTileProps> = ({ source }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.wrapper, { backgroundColor: colors.card }]}>
      <Typography variant="bold" style={styles.capitalize}>
        {source.name}
      </Typography>
      <Spacer y={10} />
    </View>
  );
};

export default SourceTile;

const styles = StyleSheet.create({
  wrapper: {
    height: Dimensions.get("window").height / 3.5,
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
