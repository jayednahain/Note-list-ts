export type DrawerParamList = {
  Home: undefined;
  Settings: undefined;
};

// Screens in the ROOT stack — this wraps the Drawer as one entry,
// plus CreatePost and AllPost sit outside the drawer chrome
export type RootStackParamList = {
  MainDrawer: undefined; // this "is" the Drawer Navigator
  CreatePost: undefined;
  AllPost: undefined;
};

// Bottom tab — static for now, no params needed yet
export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  TabThree: undefined;
};
