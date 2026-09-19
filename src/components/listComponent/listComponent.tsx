import { Post } from "@/types/post";
import { FlatList, Text, View } from "react-native";
import { ListComponentProps } from "../../types/components";

export default function ListComponent(props: ListComponentProps) {
  let { data } = props;
  return (
    <FlatList<Post>
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View
          style={{ padding: 12, borderBottomWidth: 1, borderColor: "#eee" }}
        >
          <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
          <Text numberOfLines={2}>{item.body}</Text>
        </View>
      )}
    />
  );
}
