import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Loader } from '@/components/shared/loader-provider';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import API from '@/api';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Button } from '@/components/shared';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FlashList } from '@shopify/flash-list';
import { CastMember, Recommendation } from '@/models';
import CirclePercentBar from '@/components/shared/circle-percent-bar';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addWatchList, removeWatchList } from '@/redux/slices/user-slice';
import { parse } from 'date-fns';

const fetchData = async (id: number) => {
  try {
    const [detail, recommends, credits] = await Promise.all([
      API.MOVIE.detailMovie(id),
      API.MOVIE.recommendations(id),
      API.MOVIE.credits(id),
    ]);
    return {
      ...detail,
      recommendations: recommends.results,
      crew: credits.crew.filter(e => e.job === 'Director' || e.job === 'Writer'),
      cast: credits.cast.length >= 10 ? credits.cast.slice(0, 10) : credits.cast,
    };
  }
  catch (err: any) {
    console.error(err);
    return null;
  }
};

const convertRuntime = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
}

export default function MovieDetailScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ['movie-detail'],
    queryFn: () => fetchData(Number.parseInt(params.id)),
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
        headerTitle: `${data.title} (${parse(data.release_date, 'yyyy-MM-dd', new Date()).getFullYear()})`
      });
    }
  }, [data, navigation]);

  const renderCastItem = React.useCallback(({ item }: { item: CastMember }) => {
    return (
      <View
        className='mr-2 bg-white'
        style={{ borderRadius: 8, height: 220, width: 150 }}>
        <Image
          style={{ width: '100%', height: 150, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
          source={{
            uri: `${process.env.EXPO_PUBLIC_IMAGE_URL}\w400${item.profile_path || ''}`
          }}
          contentFit='cover'
        />
        <View
          className='flex-1 p-1 justify-center items-center border border-t-0 border-gray-100'
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
          source={{
            uri: `${process.env.EXPO_PUBLIC_IMAGE_URL}\w400${item.backdrop_path || ''}`
          }}
          contentFit='cover'
        />
        <View className='p-1 flex-row items-center justify-between'>
          <Text className='flex-[3]'>{item.title}</Text>
          <Text className='flex-1 text-right'>{Math.round(item.vote_average * 1000) / 100}%</Text>
        </View>
      </View>
    );
  }, []);

  const addMovieToWatchList = () => {
    if (data) {
      dispatch(addWatchList({
        adult: data.adult,
        backdrop_path: data.backdrop_path || '',
        genre_ids: [],
        id: data?.id || 0,
        original_language: data.original_language,
        original_title: data.original_title,
        overview: data.overview,
        popularity: data.popularity,
        poster_path: data.poster_path || '',
        release_date: data.release_date,
        title: data.title,
        video: false,
        vote_average: data.vote_average,
        vote_count: data.vote_count
      }));
    }
  };

  const removeMovieFromWatchList = () => {
    dispatch(removeWatchList(data?.id || 0));
  };

  if (isLoading) {
    return <Loader />;
  };

  if (!data) {
    return (
      <View className='mt-8 justify-center items-center'>
        <Text className='text-2xl'>No Result Found</Text>
      </View>
    );
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
                  source={{
                    uri: `${process.env.EXPO_PUBLIC_IMAGE_URL}\w400${data.backdrop_path || ''}`
                  }}
                  contentFit='cover'
                />
              </View>
              <View className='flex-[2] gap-2'>
                {data.adult ? (
                  <View className='self-start rounded border border-white p-1'>
                    <Text className='text-white'>PG13</Text>
                  </View>
                ) : (
                  <View className='self-start rounded border border-white py-1 px-2'>
                    <Text className='text-white'>G</Text>
                  </View>
                )}
                <View className='flex-row items-center gap-2'>
                  <Text className='text-white text-lg'>{data.release_date}</Text>
                  <View className='h-2 w-2 bg-white rounded-full' />
                  <Text className='text-white text-lg'>{convertRuntime(data.runtime)}</Text>
                </View>
                {data.genres.length > 0 && (
                  <Text className='text-white text-lg'>{data.genres.map(e => e.name).toString().replaceAll(',', ', ')}</Text>
                )}
                <Text className='text-white text-lg font-extrabold'>Status: <Text className='text-white text-lg font-normal'>{data.status}</Text></Text>
                <Text className='text-white text-lg font-extrabold'>Original Language: <Text className='text-white text-lg font-normal'>{data.original_language}</Text></Text>
              </View>
            </View>
          </View>
          <View className='p-8 gap-4'>
            <View className='flex-row gap-2'>
              <View className='flex-1 gap-2'>
                <CirclePercentBar percentage={data.vote_average * 10} />
                <Text className='text-white text-xl text-center font-extrabold'>User Score</Text>
              </View>
              <View className='flex-1 my-2 gap-4'>
                {data.crew.map((e, index) => {
                  return (
                    <View key={index}>
                      <Text className='text-white text-lg font-extrabold'>{e.name}</Text>
                      <Text className='text-white text-lg'>{e.job}</Text>
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