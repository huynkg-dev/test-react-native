import { useInfiniteQuery } from '@tanstack/react-query';
import API from '@/api';
import { Movie, ListMovieParam } from '@/models';
import { RefreshControl, View, Text, Pressable } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Button, SkeletonLoader } from '@/components/shared';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { format, parseISO } from 'date-fns';
import { useAppSelector } from '@/redux/hooks';

const fetchData = async ({ pageParam }: { pageParam: ListMovieParam }) => {
  try {
    const res = await API.MOVIE.listMovies(pageParam);
    if (res.results.length > 0) {
      return {
        data: res.results,
        nextCursor: pageParam.page < res.total_pages ? {
          ...pageParam,
          page: ++pageParam.page
        } : undefined
      };
    }
    else {
      return {
        data: [],
        nextCursor: undefined
      }
    }
  }
  catch (err) {
    console.error(err);
    return {
      data: [],
      nextCursor: undefined
    }
  }
};

const HomeListMovies: React.FC = () => {
  const filter = useAppSelector(state => state.user.userFilter);
  const router = useRouter();
  const {
    isLoading,
    isFetching,
    data,
    hasNextPage,
    fetchNextPage,
    refetch
  } = useInfiniteQuery({
    initialPageParam: { page: 1 },
    queryKey: ['cot-cay-so', filter],
    queryFn: ({ pageParam }) => fetchData({ pageParam: { ...pageParam, ...filter } }),
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const onLoadMore = () => {
    hasNextPage && !isFetching && !isLoading && fetchNextPage()
  };

  const gotoDetail = React.useCallback((id: number) => {
    router.push(`/(features)/movie-detail?id=${id}`);
  }, []);

  const renderEmpty = React.useCallback(() => {
    return (
      <View className='mt-8 justify-center items-center'>
        <Text className='text-2xl'>No Result Found</Text>
      </View>
    );
  }, []);

  const renderFooter = React.useCallback(() => {
    return (
      <>
        {data && data.pages.flatMap(page => page.data).length > 0 && (
          <Button className='bg-blue-sky my-4' onPress={onLoadMore}>
            <Text className='text-white text-xl'>Load More</Text>
          </Button>
        )}
      </>
    );
  }, [data, onLoadMore]);

  const renderItem = React.useCallback(({ item }: { item: Movie }) => {
    const parsedDate = parseISO(item.release_date);
    const formattedDate = format(parsedDate, 'dd MMMM yyyy');
    return (
      <Pressable
        className='flex-row mb-2 w-full bg-white'
        onPress={() => gotoDetail(item.id)}>
        <Image
          style={{ width: 96, height: 141, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
          source={{
            uri: `${process.env.EXPO_PUBLIC_IMAGE_URL}\w400${item.backdrop_path}`
          }}
          contentFit='cover'
        />
        <View
          className='flex-1 gap-2 p-4 border border-l-0 border-gray-100'
          style={{ borderTopRightRadius: 8, borderBottomRightRadius: 8 }}>
          <Text className='text-xl font-bold'>{item.title}</Text>
          <Text className='text-gray-400'>{formattedDate}</Text>
          <Text numberOfLines={2}>{item.overview}</Text>
        </View>
      </Pressable>
    );
  }, []);

  if (isLoading) {
    return (
      <View className='px-8'>
        <View className='flex-row gap-2 mb-4'>
          <SkeletonLoader width={'30%'} height={150} className='rounded-lg' />
          <SkeletonLoader width={'70%'} height={150} className='rounded-lg' />
        </View>
        <View className='flex-row gap-2 mb-4'>
          <SkeletonLoader width={'30%'} height={150} className='rounded-lg' />
          <SkeletonLoader width={'70%'} height={150} className='rounded-lg' />
        </View>
        <View className='flex-row gap-2'>
          <SkeletonLoader width={'30%'} height={150} className='rounded-lg' />
          <SkeletonLoader width={'70%'} height={150} className='rounded-lg' />
        </View>
      </View>
    );
  };

  return (
    <View className='flex-1 px-8'>
      <FlashList
        data={data ? data.pages.flatMap(page => page.data) : []}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        estimatedItemSize={150}
        onEndReachedThreshold={0.1}
        scrollEventThrottle={16}
        //onEndReached={onLoadMore}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refetch}
          />
        }
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        keyboardDismissMode={'on-drag'}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeListMovies;