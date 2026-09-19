import SettingsScreen from "@/screens/settings/settingsScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerParamList } from "../types/navigation";
import BottomTabNavigator from "./bottomTabNavigator"; // ← changed
import CustomDrawerContent from "./customDrawerContent";

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
