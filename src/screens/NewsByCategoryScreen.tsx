import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useContext } from "react";
import { RouteProp, useTheme } from "@react-navigation/native";
import { AppStackParams } from "../types/navigation";
import { API_KEY } from "@env";
import { SettingsContext } from "../context/SettingsContext";
import { useFetch } from "../hooks/useFetch";
import SafeArea from "../components/layout/SafeArea";
import Spacer from "../components/layout/Spacer";
import Typography from "../components/text/Typography";
import NewsTile from "../components/ui/NewsTile";
import { Ionicons } from "@expo/vector-icons";
import { Article } from "../types/types";
interface INewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

interface ILaunchDetailsScreenProps {
  // navigation: NativeStackNavigationProp<AppStackParams, "LaunchDetailsScreen">;
  route: RouteProp<AppStackParams, "NewsByCategoryScreen">;
}

const NewsByCategoryScreen: FC<ILaunchDetailsScreenProps> = ({ route }) => {
  const { category } = route.params;
  const { colors } = useTheme();

  const { selectedCountry } = useContext(SettingsContext);

  const URI = `https://newsapi.org/v2/top-headlines?country=${
    selectedCountry.iso
  }&category=${category.toLowerCase()}&pageSize=30&apiKey=${API_KEY}`;

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

export default NewsByCategoryScreen;

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
