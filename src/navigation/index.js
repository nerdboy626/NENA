import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
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
import { TouchableOpacity } from "react-native";

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


const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Themes.colors.lightShade,
        tabBarInactiveTintColor: "honeydew",
        tabBarStyle: { backgroundColor: Themes.colors.darkShade, height: "10%" }
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

const Navigation = ({navigation}) => {
  
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
        <Stack.Screen
          name="Friends"
          component={FriendsScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerStyle: {
              backgroundColor: Themes.colors.darkShade, 
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ marginLeft: 10, color: 'blue' }}>Back</Text>
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
