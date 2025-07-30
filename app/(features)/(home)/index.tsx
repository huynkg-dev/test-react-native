import HomeFilter from '@/components/features/home/filter';
import HomeListMovies from '@/components/features/home/list-movie';
import React from 'react';
import { View } from 'react-native';

export default function HomeScreen() {    
  return (
    <View className='flex-1 bg-white'>
      <HomeFilter />
      <HomeListMovies />
    </View>
  );
}