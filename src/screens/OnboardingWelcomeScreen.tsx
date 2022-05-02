import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import SafeArea from "../components/layout/SafeArea";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParams } from "../types/navigation";
import Spacer from "../components/layout/Spacer";
import Typography from "../components/text/Typography";
import { useTheme } from "@react-navigation/native";

interface IOnboardingWelcomeScreenProps {
  navigation: NativeStackNavigationProp<
    AppStackParams,
    "OnboardingWelcomeScreen"
  >;
}

const OnboardingWelcomeScreen: FC<IOnboardingWelcomeScreenProps> = ({
  navigation,
}) => {
  const { colors } = useTheme();
  return (
    <SafeArea>
      <View style={styles.centered}>
        <Image
          source={require("../../assets/newspaper.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Spacer y={30} />

        <Typography variant="bold" size={38}>
          AVIS
        </Typography>

        <Spacer y={10} />

        <Typography color="subtext">Your source of daily news.</Typography>

        <Spacer y={30} />

        <TouchableOpacity
          onPress={() => navigation.push("OnboardingCountrySelectionScreen")}
          style={[styles.button, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
};

export default OnboardingWelcomeScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: { width: 200, height: 200 },
  button: {
    borderRadius: 25,
    width: "100%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
});
