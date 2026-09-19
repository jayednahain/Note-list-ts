import ErrorModal from "@/components/errorModal/errorModal";
import ListComponent from "@/components/listComponent/listComponent";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, BackHandler, View } from "react-native";
import { getPosts } from "../../services/postService";
import { ErrorType } from "../../types/api";
import { Post } from "../../types/post";

export default function HomeScreen() {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorType, setErrorType] = useState<ErrorType>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setErrorType(null); // clear any previous error before retrying

    try {
      const posts = await getPosts();
      setData(posts);
    } catch (err) {
      // err is typed as ApiError, thanks to postService always throwing that shape
      const apiError = err as { type: ErrorType; message: string };
      setErrorType(apiError.type);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  // useFocusEffect(
  //   useCallback(() => {
  //     fetchPosts();
  //   }, [fetchPosts]),
  // );

  const handleErrorButtonPress = () => {
    if (errorType === "no-internet") {
      BackHandler.exitApp();
    } else {
      fetchPosts(); // 'server-error' case → Try Again
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      ) : (
        <ListComponent data={data} />
      )}

      <ErrorModal
        visible={errorType !== null}
        type={errorType}
        onButtonPress={handleErrorButtonPress}
      />
    </View>
  );
}
