import { Stack } from 'expo-router';
import React from 'react';

export default function UserLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'simple_push' }}>
      <Stack.Screen name='(home)' />
    </Stack>
  );
}