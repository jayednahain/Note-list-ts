import { PostCardProps } from "@/types/components";
import { StyleSheet, Text, View } from "react-native";

export default function PostCard({ item }: PostCardProps) {
  const { title, body } = item;
  return (
    <View
      style={{
        marginHorizontal: 5,
        // paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
      }}
    >
      <Text>{title}</Text>
      <Text
        style={{
          fontSize: 20,
        }}
      >
        {body}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
