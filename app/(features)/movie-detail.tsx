import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Loader } from '@/components/shared/loader-provider';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import API from '@/api';
import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from 'expo-router';
import { Button } from '@/components/shared';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const fetchData = async () => {
  return await API.getMovieDetail();
};

export default function MovieDetailScreen() {
  const navigation = useNavigation();
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ['movie-detail'],
    queryFn: () => fetchData(),
    placeholderData: keepPreviousData,
    gcTime: 1000 * 60 * 5 // cache 5 minutes
  });

  React.useEffect(() => {
    if (data) {
      navigation.setOptions({
        headerTitle: `${data.title} (${data.year})`
      });
    }
  }, [data, navigation]);

  if (isLoading) {
    return <Loader />;
  };

  if (!data) {
    return <></>;
  };

  return (
    <SafeAreaView className='flex-1 bg-white' edges={['bottom']}>
      <View className='bg-blue-sky'>
        <View style={{ backgroundColor: '#00000026' }}>
          <View className='flex-row gap-2 px-4 py-8'>
            <View className='flex-1 justify-center items-center'>
              <Image
                style={{ width: 112, height: 150, borderRadius: 5 }}
                source={data.image}
                contentFit='cover'
              />
            </View>
            <View className='flex-[2] gap-2 justify-center'>
              <View>
                <Text>{data.rating}</Text>
              </View>
              <View className='flex-row items-center gap-2'>
                <Text className='text-white text-lg'>{data.releaseDate} ({data.contentRating})</Text>
                <View className='h-2 w-2 bg-white rounded-full' />
                <Text className='text-white text-lg'>{data.duration}</Text>
              </View>
              {data.genres.length > 0 && (
                <Text className='text-white text-lg'>{data.genres.toString().replaceAll(',', ', ')}</Text>
              )}
              <Text className='text-white text-lg font-extrabold'>Status: <Text className='text-white text-lg font-normal'>{data.status}</Text></Text>
              <Text className='text-white text-lg font-extrabold'>Original Language: <Text className='text-white text-lg font-normal'>{data.originalLanguage}</Text></Text>
            </View>
          </View>
        </View>
        <View className='p-8 gap-4'>
          <View className='flex-row gap-2'>
            <View className='flex-1'>

            </View>
            <View className='flex-1 my-2 gap-4'>
              {data.crew.map((e, index) => {
                return (
                  <View key={index}>
                    <Text className='text-white text-lg font-extrabold'>{e.name}</Text>
                    <Text className='text-white text-lg'>{e.role}</Text>
                  </View>
                );
              })}
            </View>
          </View>
          <Text className='text-white text-xl italic'>{data.tagline}</Text>
          <Text className='text-white text-2xl font-extrabold'>Overview</Text>
          <Text className='text-white text-lg'>{data.overview}</Text>
          <Button className='border border-white mt-4'>
            <FontAwesome name='bookmark' size={20} color={'white'} />
            <Text className='text-white text-lg'>Add To Watchlist</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}