import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirstScreen from "../screens/FirstScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Themes } from "../../assets/Themes";

import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import PersonalInformationScreen from "../screens/PersonalInformationScreen";
import GettingStartedScreen from "../screens/GettingStartedScreen";
import HomeScreen from "../screens/HomeScreen";
import FeedScreen from "../screens/FeedScreen";
import SearchScreen from "../screens/SearchScreen";
import UploadScreen from "../screens/UploadScreen";

import FriendsScreen from "../screens/FriendsScreen";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Placeholders until these screens are created
const WorkoutScreen = () => (
  <View>
    <Text>Workout</Text>
  </View>
);
const SocialScreen = () => (
  <View>
    <Text>Social</Text>
  </View>
);

// const HomeStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen
//         name="Tutorial1"
//         component={Tutorial1}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="Tutorial2"
//         component={Tutorial2}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="Tutorial3"
//         component={Tutorial3}
//         options={{ animation: "none" }}
//       />
// //       <Stack.Screen
// //         name="Tutorial4"
// //         component={Tutorial4}
// //         options={{ animation: "none" }}
// //       />
// //       <Stack.Screen
// //         name="Tutorial5"
// //         component={Tutorial5}
// //         options={{ animation: "none" }}
// //       />
// //       <Stack.Screen
// //         name="Tutorial6"
// //         component={Tutorial6}
// //         options={{ animation: "none" }}
// //       />
// //       <Stack.Screen
// //         name="HomeScreen"
// //         component={HomeScreen}
// //         options={{ animation: "none" }}
// //       />
// //       <Stack.Screen
// //         name="HomeTouch"
// //         component={HomeScreenTouch}
// //         options={{ animation: "none" }}
// //       />
// //     </Stack.Navigator>
// //   );
// // };

// const WorkoutStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen
//         name="Today's Workout"
//         component={TodaysWorkoutScreen}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="Edit Workout"
//         component={EditWorkoutScreen}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="Edit High Knees"
//         component={EditHighKneesScreen}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="Edit Bicycle Crunches"
//         component={EditBicycleCrunchesScreen}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="Edit Squats"
//         component={EditSquatsScreen}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="Edit Pushups"
//         component={EditPushupsScreen}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="Ready Workout"
//         component={ReadyWorkoutScreen}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="High Knees"
//         component={HighKneesScreen}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="After High Knees"
//         component={AfterHighKneesScreen}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="Bicycle Crunches"
//         component={BicycleCrunchesScreen}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="After Bicycle Crunches"
//         component={AfterBicycleCrunchesScreen}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="Squats"
//         component={SquatsScreen}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="After Squats"
//         component={AfterSquatsScreen}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="Pushups"
//         component={PushupsScreen}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="Finished Workout"
//         component={FinishedWorkoutScreen}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="Today's Workout Complete"
//         component={TodaysWorkoutCompleteScreen}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="High Knees Info"
//         component={HighKneesInfoScreen}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="Bicycle Crunches Info"
//         component={BicycleCrunchesInfoScreen}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="Squats Info"
//         component={SquatsInfoScreen}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="Pushups Info"
//         component={PushupsInfoScreen}
//         options={{ animation: "none" }}
//       />
//     </Stack.Navigator>
//   );
// };

// const ScheduleStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen
//         name="Sync1"
//         component={SyncScreen1}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="Sync2"
//         component={SyncScreen2}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="Sync3"
//         component={SyncScreen3}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="Sync4"
//         component={SyncScreen4}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="Schedule"
//         component={ScheduleScreen}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="WorkoutDetails"
//         component={WorkoutDetailsScreen}
//         options={{ animation: "none" }}
//       />
//     </Stack.Navigator>
//   );
// };

// const SocialStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen
//         name="Messages"
//         component={MessagesScreen}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="Friends"
//         component={FriendsScreen}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="Request"
//         component={SendRequest}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="Accept"
//         component={AcceptRequest}
//         options={{ animation: "none" }}
//       />
//       <Stack.Screen
//         name="FindFriends"
//         component={FindFriendsScreen}
//         options={{ animation: "none" }}
//       />
//     </Stack.Navigator>
//   );
// };

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Themes.colors.background,
        tabBarInactiveTintColor: Themes.colors.lightShade,
        //tabBarLabelStyle: { color: "black" },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: "Profile",
          color: "black",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={36} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="FeedTab"
        component={FeedScreen}
        options={{
          tabBarLabel: "Feed",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="lightning-bolt"
              size={36}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={36} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="FriendsTab"
        component={FriendsScreen}
        options={{
          tabBarLabel: "Friends",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={36} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={UploadScreen}
        options={{
          tabBarLabel: "Upload",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create" size={36} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Workout"
        component={WorkoutStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="barbell" color={color} size={50} />
          ),
        }}
      />
      <Tab.Screen
        name="Scheduling"
        component={ScheduleStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" color={color} size={50} />
          ),
        }}
      />
      <Tab.Screen
        name="Social"
        component={SocialStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="people" color={color} size={50} />
          ),
          tabBarBadge: Globals.notificationCount,
          tabBarBadgeStyle: { backgroundColor: "#EE6C4D", color: "white" },
        }}
      /> */}
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "none" }}
      >
        <Stack.Screen
          name="First screen"
          component={FirstScreen}
          options={{ animation: "none" }}
        />
        <Stack.Screen
          name="Sign in screen"
          component={SignInScreen}
          options={{ animation: "none" }}
        />
        <Stack.Screen
          name="Sign up screen"
          component={SignUpScreen}
          options={{ animation: "none" }}
        />
        <Stack.Screen
          name="Welcome screen"
          component={WelcomeScreen}
          options={{ animation: "none" }}
        />
        <Stack.Screen
          name="Personal information screen"
          component={PersonalInformationScreen}
          options={{ animation: "none" }}
        />
        <Stack.Screen
          name="Getting started screen"
          component={GettingStartedScreen}
          options={{ animation: "none" }}
        />
        <Stack.Screen
          name="Home screen"
          component={Tabs}
          options={{ animation: "none" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
