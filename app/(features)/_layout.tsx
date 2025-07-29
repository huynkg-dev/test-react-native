import Header from '@/components/shared/header';
import { Stack } from 'expo-router';
import React from 'react';

export default function FeatureLayout() {
  return (
    <Stack initialRouteName='(home)' screenOptions={{ animation: 'simple_push' }}>
      <Stack.Screen
        name='(home)'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='movie-detail'
        options={{
          headerTransparent: false,
          header: (props) => <Header showHeader headerColor='#00000026' {...props} />,
        }}
      />
    </Stack>
  );
}