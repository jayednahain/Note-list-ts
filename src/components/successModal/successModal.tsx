import { Modal, Pressable, Text, View } from "react-native";
import { SuccessModalProps } from "../../types/components";

export default function SuccessModal(props: SuccessModalProps) {
  let {
    visible,
    message = "Post created successfully!",
    onButtonPress,
  } = props;
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
          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 16 }}>
            {message}
          </Text>
          <Pressable onPress={onButtonPress} style={{ alignSelf: "flex-end" }}>
            <Text style={{ color: "#007AFF", fontWeight: "bold" }}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
