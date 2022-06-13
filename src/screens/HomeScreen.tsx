import React, { useContext } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import Typography from "../components/text/Typography";
import SafeArea from "../components/layout/SafeArea";
import Spacer from "../components/layout/Spacer";

import { useFetch } from "../hooks/useFetch";
import { SettingsContext } from "../context/SettingsContext";
import { API_KEY } from "@env";
import { Article } from "../types/types";
import NewsTile from "../components/ui/NewsTile";

interface INewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

const HomeScreen = () => {
  const { selectedCountry } = useContext(SettingsContext);
  const { colors } = useTheme();

  const URI = `https://newsapi.org/v2/top-headlines?country=${selectedCountry.iso}&pageSize=30&apiKey=${API_KEY}`;

  const { response, loading, error, fetchData } = useFetch<INewsResponse>(URI);

  return (
    <SafeArea>
      {loading && (
        <View style={styles.centeredPage}>
          <ActivityIndicator size={60} color={colors.primary} />
        </View>
      )}
      {error && (
        <View style={styles.centeredPage}>
          <TouchableOpacity onPress={() => fetchData()}>
            <Ionicons name="refresh" color={colors.primary} size={40} />
          </TouchableOpacity>
          <Spacer y={10} />
          <Typography>There was an error fetching data.</Typography>
        </View>
      )}
      {!loading && !error && response?.articles && (
        <FlatList
          contentContainerStyle={styles.flatListContent}
          data={response.articles}
          keyExtractor={(item) => item.title}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.listItemWrapper,
                {
                  borderBottomColor: colors.separator,
                  borderBottomWidth:
                    index + 1 < response.articles.length ? 0.17 : 0,
                },
              ]}
            >
              <NewsTile article={item} />
            </View>
          )}
        />
      )}
    </SafeArea>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  centeredPage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listItemWrapper: { paddingVertical: 20 },
  flatListContent: { paddingHorizontal: 15 },
  topRowIconContainer: { flexDirection: "row" },
});
