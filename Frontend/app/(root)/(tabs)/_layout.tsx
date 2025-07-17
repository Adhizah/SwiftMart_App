import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Layout = () => (
  <SafeAreaView className="flex-1 font-Manrope bg-white">
    <StatusBar style="dark" />
    <View style={{ flex: 1, overflow: "hidden" }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#156651",
          tabBarInactiveTintColor: "#C2C2C2",
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#ffffff",
            paddingBottom: 16,
            paddingTop: 16,
            paddingRight: 16,
            paddingLeft: 16,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            borderTopWidth: 0, // Remove the thin border
            shadowColor: "#000", // Shadow color
            shadowOffset: { width: 0, height: -2 }, // Shadow offset above the origin
            shadowOpacity: 0.1, // Shadow opacity
            shadowRadius: 10, // Shadow blur radius
            elevation: 5, // Android shadow support
            zIndex: 10, // Ensure the shadow is above other elements
          },
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <Feather
                name="home"
                size={28}
                color={focused ? "#156651" : "#9CA3AF"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Search"
          options={{
            title: "Search",
            tabBarIcon: ({ focused }) => (
              <Feather
                name="search"
                size={28}
                color={focused ? "#156651" : "#9CA3AF"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Feed"
          options={{
            title: "Feed",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons
                className="h-14 w-14"
                  name="video-plus"
                  size={48}
                  color="#156651"
                />
              ) : (
                <Feather
                  name="wifi"
                  size={28}
                  color="#c2c2c2"
                  className="rotate-45"
                />
              ),
          }}
        />
        <Tabs.Screen
          name="(checkout)"
          options={{
            title: "Cart",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="cart-outline"
                size={28}
                color={focused ? "#156651" : "#9CA3AF"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <Feather
                name="user"
                size={28}
                color={focused ? "#156651" : "#9CA3AF"}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  </SafeAreaView>
);

export default Layout;
