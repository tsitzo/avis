import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { BookmarksContext } from "../context/BookmarksContext";
import NewsTile from "../components/ui/NewsTile";
import { useTheme } from "@react-navigation/native";
import SafeArea from "../components/layout/SafeArea";
import Spacer from "../components/layout/Spacer";
import Typography from "../components/text/Typography";
import { Ionicons } from "@expo/vector-icons";

const BookmarkedNewsScreen = () => {
  const { bookmarkedNews } = useContext(BookmarksContext);
  const { colors } = useTheme();

  return (
    <SafeArea>
      {bookmarkedNews.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.flatListContent}
          data={bookmarkedNews.reverse()}
          keyExtractor={(item) => item.title}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.listItemWrapper,
                {
                  borderBottomColor: colors.separator,
                  borderBottomWidth:
                    index + 1 < bookmarkedNews.length ? 0.17 : 0,
                },
              ]}
            >
              <NewsTile article={item} />
            </View>
          )}
        />
      ) : (
        <View style={styles.centeredPage}>
          <Typography style={styles.centerText}>
            There is no saved news.
          </Typography>
          <Spacer y={10} />
          <Typography style={styles.centerText}>
            They will appear on this page once you click on the{" "}
            <Ionicons name="bookmark" color={colors.primary} /> button on each
            news.
          </Typography>
        </View>
      )}
    </SafeArea>
  );
};

export default BookmarkedNewsScreen;

const styles = StyleSheet.create({
  listItemWrapper: { paddingVertical: 20 },
  flatListContent: { paddingHorizontal: 15 },
  centerText: { textAlign: "center" },
  centeredPage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
