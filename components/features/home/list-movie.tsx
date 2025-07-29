import { useInfiniteQuery } from '@tanstack/react-query';
import API from '@/api';
import { ListParam, Movie } from '@/models';
import { RefreshControl, View, Text, Pressable } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Button } from '@/components/shared';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

interface HomeListMoviesProps {
  filter?: any;
};


const fetchData = async ({ pageParam }: { pageParam: ListParam }) => {
  const result = await API.getListMovies(pageParam);
  if (result.data.length > 0) {
    return {
      data: result.data,
      nextCursor: result.hasNextPage ? {
        ...pageParam,
        offset: pageParam.offset++
      } : undefined
    };
  }
  else {
    return {
      data: [],
      nextCursor: undefined
    }
  }
};

const HomeListMovies: React.FC<HomeListMoviesProps> = ({
  filter
}) => {
  const router = useRouter();
  const {
    isLoading,
    isFetching,
    data,
    hasNextPage,
    fetchNextPage,
    refetch
  } = useInfiniteQuery({
    initialPageParam: { offset: 0, limit: 5 },
    queryKey: ['cot-cay-so'],
    queryFn: ({ pageParam }) => fetchData({ pageParam }),
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const onLoadMore = () => {
    hasNextPage && !isFetching && !isLoading && fetchNextPage()
  };

  const gotoDetail = () => {
    router.push('/(features)/movie-detail');
  };

  const renderEmpty = React.useCallback(() => {
    return (
      <></>
    );
  }, []);

  const renderFooter = React.useCallback(() => {
    return (
      <Button className='bg-blue-sky my-4' onPress={onLoadMore} disabled={!hasNextPage || isFetching}>
        <Text className='text-white text-xl'>Load More</Text>
      </Button>
    );
  }, []);

  const renderItem = React.useCallback(({ item }: { item: Movie }) => {
    return (
      <Pressable
        className='flex-row mb-2 w-full border border-gray-100 bg-white'
        style={{ borderRadius: 8 }}
        onPress={gotoDetail}>
        <Image
          style={{ width: 96, height: 141, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
          source={item.image}
          contentFit='cover'
        />
        <View className='flex-1 gap-2 p-4'>
          <Text className='text-xl font-bold'>{item.title}</Text>
          <Text className='text-gray-400'>{item.date}</Text>
          <Text>{item.description}</Text>
        </View>
      </Pressable>
    );
  }, []);

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