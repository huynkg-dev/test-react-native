import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Loader } from '@/components/shared/loader-provider';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import API from '@/api';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from 'expo-router';
import { Button } from '@/components/shared';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FlashList } from '@shopify/flash-list';
import { CastMember, Recommendation } from '@/models';
import CirclePercentBar from '@/components/shared/circle-percent-bar';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addWatchList, removeWatchList } from '@/redux/slices/user-slice';

const fetchData = async () => {
  return await API.getMovieDetail();
};

export default function MovieDetailScreen() {
  const dispatch = useAppDispatch();
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

  const watchList = useAppSelector(state => state.user.watchList);
  const isInWatchList: boolean = React.useMemo(() => {
    if (data) {
      const index = watchList.findIndex(e => e.id === data.id);
      return index >= 0;
    }
    return false;
  }, [data, watchList]);

  React.useEffect(() => {
    if (data) {
      navigation.setOptions({
        headerTitle: `${data.title} (${data.year})`
      });
    }
  }, [data, navigation]);

  const renderCastItem = React.useCallback(({ item }: { item: CastMember }) => {
    return (
      <View
        className='flex-1 w-40 mr-2 bg-white'
        style={{ borderRadius: 8 }}>
        <Image
          style={{ width: '100%', height: 150, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
          source={item.image}
          contentFit='cover'
        />
        <View
          className='p-1 justify-center items-center border border-t-0 border-gray-100'
          style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
          <Text className='text-lg text-center font-extrabold'>{item.name}</Text>
          <Text className='text-lg text-center'>{item.character}</Text>
        </View>
      </View>
    );
  }, []);

  const renderRecommendItem = React.useCallback(({ item }: { item: Recommendation }) => {
    return (
      <View className='flex-1 w-80 mr-2'>
        <Image
          style={{ width: '100%', height: 170, borderRadius: 10 }}
          source={item.image}
          contentFit='cover'
        />
        <View className='p-1 flex-row items-center justify-between'>
          <Text>{item.title}</Text>
          <Text>{item.rating}%</Text>
        </View>
      </View>
    );
  }, []);

  const addMovieToWatchList = () => {
    dispatch(addWatchList({
      'id': 1,
      'title': 'Barbie',
      'date': '19 July 2023',
      'description': 'Barbie and Ken are having the time of their lives in the colorful and...',
      'image': require('@/assets/images/movies/iuFNMS8U5cb6xfzi51Dbkovj7vM (1) 1.webp'),
      'rating': 74,
      'tags': []
    }));
  };

  const removeMovieFromWatchList = () => {
    dispatch(removeWatchList(data?.id || 0));
  };

  if (isLoading) {
    return <Loader />;
  };

  if (!data) {
    return <></>;
  };

  return (
    <SafeAreaView className='flex-1' edges={['bottom']}>
      <ScrollView className='flex-1 bg-blue-sky' showsVerticalScrollIndicator={false}>
        <View>
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
                <View className='self-start rounded border border-white p-1'>
                  <Text className='text-white'>{data.rating}</Text>
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
              <View className='flex-1 gap-2'>
                <CirclePercentBar percentage={data.userScore} />
                <Text className='text-white text-xl text-center font-extrabold'>User Score</Text>
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
            <Text className='text-white text-xl italic my-4'>{data.tagline}</Text>
            <Text className='text-white text-2xl font-extrabold'>Overview</Text>
            <Text className='text-white text-lg'>{data.overview}</Text>
            {isInWatchList ? (
              <View className='flex-row items-center gap-2 mt-4'>
                <Text className='text-lg font-extrabold'>Added to the watchlist!</Text>
                <Pressable onPress={removeMovieFromWatchList}>
                  <Text className='underline'>Remove from watchlist!</Text>
                </Pressable>
              </View>
            ) : (
              <Button
                className='self-start border border-white px-4 mt-4'
                onPress={addMovieToWatchList}>
                <FontAwesome name='bookmark' size={20} color={'white'} />
                <Text className='text-white text-lg'>Add To Watchlist</Text>
              </Button>
            )}

          </View>
        </View>
        <View className='p-8 bg-white'>
          <Text className='text-2xl font-extrabold'>Top Billed Cast</Text>
          <ScrollView className='my-8 h-64' horizontal showsHorizontalScrollIndicator={false}>
            <FlashList
              keyExtractor={(item) => `${item.id}`}
              data={data.cast}
              renderItem={renderCastItem}
              estimatedItemSize={200}
              horizontal
            />
          </ScrollView>
        </View>
        <View className='p-8 bg-white'>
          <Text className='text-2xl font-extrabold'>Recommendations</Text>
          <ScrollView className='my-8 h-64' horizontal showsHorizontalScrollIndicator={false}>
            <FlashList
              keyExtractor={(item) => `${item.id}`}
              data={data.recommendations}
              renderItem={renderRecommendItem}
              estimatedItemSize={200}
              horizontal
            />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}