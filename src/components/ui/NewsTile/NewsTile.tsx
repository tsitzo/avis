import {
  ActivityIndicator,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useState } from "react";
import { Article } from "../../../types/types";
import { useTheme } from "@react-navigation/native";
import Spacer from "../../layout/Spacer";
import Typography from "../../text/Typography";
import NewsTileBookmarkButton from "./NewsTileBookmarkButton";
import dayjs from "dayjs";

interface INewsTileProps {
  article: Article;
}

const NewsTile: FC<INewsTileProps> = ({ article }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={() => {}}>
      {isLoading && (
        <View
          style={[styles.placeHolderImage, { backgroundColor: colors.card }]}
        >
          <ActivityIndicator color={colors.primary} />
        </View>
      )}
      {article.urlToImage !== "" ? (
        <Image
          resizeMode="cover"
          source={{
            uri: article.urlToImage!,
          }}
          style={styles.image}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
        />
      ) : (
        <View
          style={[styles.placeHolderImage, { backgroundColor: colors.card }]}
        >
          <ActivityIndicator color={colors.primary} />
        </View>
      )}

      <Spacer y={20} />

      <View style={styles.row}>
        <View style={styles.subrow}>
          <Typography variant="bold" numberOfLines={3}>
            {article.title}
          </Typography>
        </View>
        <NewsTileBookmarkButton article={article} />
      </View>

      <Spacer y={10} />

      <Typography color="subtext" size={14}>
        {article.content}
      </Typography>

      <Spacer y={10} />

      <View style={styles.row}>
        <Typography color="subtext" size={14}>
          {dayjs(article.publishedAt).format("MMMM D, YYYY")}
        </Typography>
        <Typography variant="bold" color="primary" size={14}>
          {article.source.name}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

export default NewsTile;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subrow: { flex: 4.7 / 5 },
  placeHolderImage: {
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    zIndex: 0,
    width: "100%",
    position: "absolute",
    aspectRatio: 1.7 / 1,
    borderRadius: 10,
  },
  image: { width: "100%", aspectRatio: 1.7 / 1, zIndex: 0, borderRadius: 10 },
});
