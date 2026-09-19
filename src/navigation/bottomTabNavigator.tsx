import HomeScreen from "@/screens/home/homeScreen";
import TabThreeScreen from "@/screens/tabThree/TabThreeScreen";
import TabTwoScreen from "@/screens/tabTwo/TabTwoScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../types/navigation";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute", // lifts it off the bottom edge
          bottom: 20,
          left: 20,
          right: 20,
          height: 60,
          borderRadius: 20, // pill/floating shape
          borderTopWidth: 0, // removes the default hard line
          backgroundColor: "#ffffff",
          elevation: 5, // Android shadow
          shadowColor: "#000", // iOS shadow
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
      }}
    >
      <Tab.Screen name="TabOne" component={HomeScreen} />
      <Tab.Screen name="TabTwo" component={TabTwoScreen} />
      <Tab.Screen name="TabThree" component={TabThreeScreen} />
    </Tab.Navigator>
  );
}
