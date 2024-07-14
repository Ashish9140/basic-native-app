import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Image, Text, Platform } from 'react-native';
import icons from '../../constants/icons'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          height: 72,
          elevation: 0,
        }

      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'home',
          tabBarIcon: ({ color, focused }) => {
            return (
              <View style={{
                alignItems: "center",
                paddingTop: 16,
                borderTopColor: focused ? "#04AA6D" : "#FFFFFF",
                borderTopWidth: 2
              }}>

                <Image
                  source={icons.home}
                  style={{
                    height: 24,
                    width: 24,
                    tintColor: focused ? "#04AA6D" : "#000000"
                  }}
                />

                <Text style={{
                  fontSize: 14,
                  color: focused ? "#04AA6D" : "#000000"
                }}>
                  Home
                </Text>

              </View>
            )
          }
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: 'News',
          tabBarIcon: ({ color, focused }) => {
            return (
              <View style={{
                alignItems: "center",
                paddingTop: 16,
                borderTopColor: focused ? "#04AA6D" : "#FFFFFF",
                borderTopWidth: 2
              }}>

                <Image
                  source={icons.news}
                  style={{
                    height: 24,
                    width: 24,
                    tintColor: focused ? "#04AA6D" : "#000000"
                  }}
                />

                <Text style={{
                  fontSize: 14,
                  color: focused ? "#04AA6D" : "#000000"
                }}>
                  News
                </Text>

              </View>
            )
          }
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'index',
          tabBarIcon: ({ color, focused }) => {
            return (
              <View style={{
                alignItems: "center",
                justifyContent: "center",
                color:"#04AA6D"
              }}>

                <Image
                  source={icons.snap}
                  style={{
                    backgroundColor: focused? "#04AA6D" : "#FFFFFF",
                    width: Platform.OS == "ios" ? 50 : 70,
                    height: Platform.OS == "ios" ? 50 : 70,
                    top: Platform.OS == "ios" ? -10 : -30,
                    borderRadius: Platform.OS == "ios" ? 25 : 40,
                    borderColor:"#04AA6D"
                  }}
                />

                {/* <Text style={{
                  fontSize: 14,
                  color: focused ? "#FB9373" : "#FFFFFF"
                }}>
                  Snap
                </Text> */}

              </View>
            )
          }
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: 'Bookmark',
          tabBarIcon: ({ color, focused }) => {
            return (
              <View style={{
                alignItems: "center",
                paddingTop: 16,
                borderTopColor: focused ? "#04AA6D" : "#FFFFFF",
                borderTopWidth: 2
              }}>

                <Image
                  source={icons.bookmark}
                  style={{
                    height: 24,
                    width: 24,
                    tintColor: focused ? "#04AA6D" : "#000000"
                  }}
                />

                <Text style={{
                  fontSize: 14,
                  color: focused ? "#04AA6D" : "#000000"
                }}>
                  Bookmark
                </Text>

              </View>
            )
          }
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => {
            return (
              <View style={{
                alignItems: "center",
                paddingTop: 16,
                borderTopColor: focused ? "#04AA6D" : "#FFFFFF",
                borderTopWidth: 2
              }}>

                <Image
                  source={icons.profile}
                  style={{
                    height: 24,
                    width: 24,
                    tintColor: focused ? "#04AA6D" : "#000000"
                  }}
                />

                <Text style={{
                  fontSize: 14,
                  color: focused ? "#04AA6D" : "#000000"
                }}>
                  Profile
                </Text>

              </View>
            )
          }
        }}
      />
    </Tabs>
  );
}
