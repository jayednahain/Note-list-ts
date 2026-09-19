import AllPostScreen from "@/screens/allPost/allPostScreen";
import CreatePostScreen from "@/screens/createPost/createPostScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import DrawerNavigator from "./drawerNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainDrawer" component={DrawerNavigator} />
      <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      <Stack.Screen name="AllPost" component={AllPostScreen} />
    </Stack.Navigator>
  );
}
