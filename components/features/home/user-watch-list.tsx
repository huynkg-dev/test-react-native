import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { ArrowDownIcon, ArrowUpIcon, XIcon } from 'lucide-nativewind';
import { removeWatchList } from '@/redux/slices/user-slice';
import React from 'react';
import { UnderlineSelect } from '@/components/shared';
import { FlashList } from '@shopify/flash-list';
import { Movie } from '@/models';
import { format, parse, parseISO } from 'date-fns';
import { useRouter } from 'expo-router';
import _ from 'lodash';

const FilterOptions = [
  { label: 'Rating', value: 'RATE' },
  { label: 'Alphabe', value: 'ALPHA' },
  { label: 'Release Date', value: 'RELEASE' },
];

const UserWatchList: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const watchList = useAppSelector(state => state.user.watchList);
  const [order, setOrder] = React.useState(false);
  const [filter, setFilter] = React.useState(FilterOptions[0].value);

  const [showWatchList, setShowWatchList] = React.useState<Movie[]>(
    _.orderBy(watchList,
      [(item) => item.vote_average],
      [order ? 'desc' : 'asc']
    )
  );

  const handleFilter = (value: string) => {
    setFilter(value);
    switch (value) {
      case 'RATE':
        setShowWatchList(
          _.orderBy(watchList,
            [(item) => item.vote_average],
            [order ? 'desc' : 'asc']
          )
        );
        break;
      case 'ALPHA':
        setShowWatchList(
          _.orderBy(watchList,
            [(item) => item.title],
            [order ? 'desc' : 'asc']
          )
        );
        break;
      case 'RELEASE':
        setShowWatchList(
          _.orderBy(watchList,
            [(item) => parse(item.release_date, 'yyyy-MM-dd', new Date())],
            [order ? 'desc' : 'asc']
          )
        );
        break;
    }
  };

  const handleOrder = () => {
    setOrder(prev => !prev);
    switch (filter) {
      case 'RATE':
        setShowWatchList(
          _.orderBy(watchList,
            [(item) => item.vote_average],
            [!order ? 'desc' : 'asc']
          )
        );
        break;
      case 'ALPHA':
        setShowWatchList(
          _.orderBy(watchList,
            [(item) => item.title],
            [!order ? 'desc' : 'asc']
          )
        );
        break;
      case 'RELEASE':
        setShowWatchList(
          _.orderBy(watchList,
            [(item) => parse(item.release_date, 'yyyy-MM-dd', new Date())],
            [!order ? 'desc' : 'asc']
          )
        );
        break;
    }
  };

  const gotoDetail = React.useCallback((id: number) => {
    router.push(`/(features)/movie-detail?id=${id}`);
  }, []);

  const renderEmpty = React.useCallback(() => {
    return (
      <View className='mt-8 justify-center items-center'>
        <Text className='text-xl'>Watchlist empty</Text>
      </View>
    );
  }, []);

  const renderItem = React.useCallback(({ item }: { item: Movie }) => {
    const parsedDate = parseISO(item.release_date);
    const formattedDate = format(parsedDate, 'dd MMMM yyyy');
    return (
      <Pressable
        className='flex-row mb-2 w-full bg-white'
        onPress={() => gotoDetail(item.id)}>
        <TouchableOpacity
          className='absolute top-0 right-0 p-2 z-50'
          onPress={() => dispatch(removeWatchList(item.id))}>
          <XIcon size={20} />
        </TouchableOpacity>
        <Image
          style={{ width: 96, height: 141, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
          source={{
            uri: `${process.env.EXPO_PUBLIC_IMAGE_URL}\w400${item.backdrop_path}`
          }}
          contentFit='cover'
        />
        <View
          className='flex-1 gap-2 p-4 pr-8 border border-l-0 border-gray-100'
          style={{ borderTopRightRadius: 8, borderBottomRightRadius: 8 }}>
          <Text className='text-xl font-bold'>{item.title}</Text>
          <Text className='text-gray-400'>{formattedDate}</Text>
          <Text numberOfLines={2}>{item.overview}</Text>
        </View>
      </Pressable>
    );
  }, []);

  return (
    <View className='flex-1 p-8'>
      <Text className='text-xl font-extrabold'>My Watchlist</Text>
      <View className='flex-row gap-2 my-4 items-center'>
        <Text className='text-lg text-gray-300'>Filter by:</Text>
        <UnderlineSelect
          value={filter}
          onChange={handleFilter}
          datasource={FilterOptions}
          disableSearch
        />
        <TouchableOpacity className='flex-row gap-2 items-center' onPress={handleOrder}>
          <Text className='text-lg text-gray-300'>Order:</Text>
          {order ? (
            <ArrowUpIcon size={22} />
          ) : (
            <ArrowDownIcon size={22} />
          )}
        </TouchableOpacity>
      </View>
      <FlashList
        className='flex-1'
        data={showWatchList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        estimatedItemSize={150}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default UserWatchList;