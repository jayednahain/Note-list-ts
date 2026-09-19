import {
  DrawerContentComponentProps,
  DrawerItem,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootStackParamList } from "../types/navigation";

// Typed handle to the ROOT stack navigator (not the drawer)
type RootNavProp = NativeStackNavigationProp<RootStackParamList>;

export default function CustomDrawerContent(
  props: DrawerContentComponentProps,
) {
  // this grabs the parent (root) navigator, so we can escape the drawer
  const rootNavigation = useNavigation<RootNavProp>();
  const insets = useSafeAreaInsets();

  // Android workaround: the drawer panel uses removeClippedSubviews, and children
  // inserted before the panel has a width get marked "clipped" and never re-attached
  // on a cold load (they appear after any re-render). Mounting the items only after
  // this container has a real size avoids the race. No-op on iOS.
  const [hasLayout, setHasLayout] = useState(false);

  return (
    <View
      onLayout={(e) => {
        if (e.nativeEvent.layout.width > 0) setHasLayout(true);
      }}
      style={[
        styles.container,
        { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 12 },
      ]}
    >
      {hasLayout && (
        <>
          <DrawerItem
            label="Home"
            onPress={() => props.navigation.navigate("Home")}
          />
          <DrawerItem
            label="Create Post"
            onPress={() => rootNavigation.navigate("CreatePost")}
          />
          <DrawerItem
            label="All Post"
            onPress={() => rootNavigation.navigate("AllPost")}
          />
          <DrawerItem
            label="Settings"
            onPress={() => props.navigation.navigate("Settings")}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
});
