import ErrorModal from "@/components/errorModal/errorModal";
import SuccessModal from "@/components/successModal/successModal";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { createPost } from "../../services/postService";
import { ErrorType } from "../../types/api";
import { RootStackParamList } from "../../types/navigation";
type CreatePostNavProp = NativeStackNavigationProp<
  RootStackParamList,
  "CreatePost"
>;

export default function CreatePostScreen() {
  const navigation = useNavigation<CreatePostNavProp>();

  const [title, setTitle] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorType, setErrorType] = useState<ErrorType>(null);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!title.trim()) return; // guard against empty submits

    setSubmitting(true);
    setErrorType(null);

    try {
      await createPost({ title, body: title, userId: 1 });
      setShowSuccess(true);
    } catch (err) {
      const apiError = err as { type: ErrorType };
      setErrorType(apiError.type);
    } finally {
      setSubmitting(false);
    }
  };

  const handleErrorButtonPress = () => {
    // Create Post's server-error should just let them retry the same submit
    setErrorType(null);
  };

  const handleSuccessButtonPress = () => {
    setShowSuccess(false);
    navigation.navigate("MainDrawer"); // back to Home (inside the drawer)
  };

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="What's on your mind?"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
        }}
      />

      <Pressable
        onPress={handleSubmit}
        disabled={submitting}
        style={{
          backgroundColor: submitting ? "#aaa" : "#007AFF",
          padding: 14,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          {submitting ? "Submitting..." : "Submit"}
        </Text>
      </Pressable>

      <ErrorModal
        visible={errorType !== null}
        type={errorType}
        onButtonPress={handleErrorButtonPress}
      />

      <SuccessModal
        visible={showSuccess}
        onButtonPress={handleSuccessButtonPress}
      />
    </View>
  );
}
