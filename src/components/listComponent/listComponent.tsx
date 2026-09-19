import { Post } from "@/types/post";
import { FlatList } from "react-native";
import { ListComponentProps } from "../../types/components";
import PostCard from "../cardComponent/postCard";

export default function ListComponent(props: ListComponentProps) {
  let { data } = props;
  return (
    <FlatList<Post>
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <PostCard item={item} />}
    />
  );
}
