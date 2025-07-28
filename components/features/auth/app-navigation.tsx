import { Stack } from 'expo-router';
import React from 'react';

export default function AppNavigation() {

  return (
    <Stack initialRouteName='(features)' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='(features)' />
    </Stack>
  );
}