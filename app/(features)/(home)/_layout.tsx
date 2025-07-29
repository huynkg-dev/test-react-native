import Header from '@/components/shared/header';
import { Tabs } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#042541'
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#FFFFFF',
      }}>
      <Tabs.Screen
        name='index'
        options={{
          header: (props) => <Header {...props} />,
          tabBarIcon: ({ size, color }) =>
            <FontAwesome5 name='home' size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name='watch-list'
        options={{
          header: (props) => <Header showHeader {...props} />,
          tabBarIcon: ({ size, color }) =>
            <FontAwesome name='bookmark' size={size} color={color} />
        }}
      />
    </Tabs>
  );
}