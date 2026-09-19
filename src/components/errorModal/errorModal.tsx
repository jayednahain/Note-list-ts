import { Modal, Pressable, Text, View } from "react-native";
import { ErrorModalProps } from "../../types/components";

export default function ErrorModal(props: ErrorModalProps) {
  let { visible, type, onButtonPress } = props;
  if (!type) return null; // no error → render nothing

  const isNoInternet = type === "no-internet";

  const title = isNoInternet ? "No Internet Connection" : "Server Error";
  const message = isNoInternet
    ? "Please check your connection and try again."
    : "Something went wrong while loading data.";
  const buttonLabel = isNoInternet ? "Exit" : "Try Again";

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            padding: 24,
            borderRadius: 12,
            width: "80%",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8 }}>
            {title}
          </Text>
          <Text style={{ marginBottom: 16 }}>{message}</Text>
          <Pressable onPress={onButtonPress} style={{ alignSelf: "flex-end" }}>
            <Text style={{ color: "#007AFF", fontWeight: "bold" }}>
              {buttonLabel}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
