import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import UserWatchList from '@/components/features/home/user-watch-list';

export default function DashboardScreen() {
  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='flex-row bg-dark-blue gap-2'>
        <View className='px-8 py-6 justify-center items-center'>
          <View className='w-20 h-20 rounded-full bg-purple justify-center items-center'>
            <Text className='text-2xl text-white font-extrabold'>J</Text>
          </View>
        </View>
        <View className='flex-1 justify-center'>
          <Text className='text-xl text-white'>John Lee</Text>
          <Text className='text-white'>Member since August 2023</Text>
        </View>
      </View>
      <UserWatchList/>
    </ScrollView>
  );
}