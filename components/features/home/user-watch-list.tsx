import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { ArrowDownIcon, ArrowUpIcon, XIcon } from 'lucide-nativewind';
import { removeWatchList } from '@/redux/slices/user-slice';
import React from 'react';
import { UnderlineSelect } from '@/components/shared';
import { FlashList } from '@shopify/flash-list';
import { Movie } from '@/models';

const FilterOptions = [
  { label: 'Rating', value: 'RATE' },
  { label: 'Score', value: 'SCORE' },
];

const UserWatchList: React.FC = () => {
  const dispatch = useAppDispatch();
  const watchList = useAppSelector(state => state.user.watchList);
  const [order, setOrder] = React.useState(false);
  const [filter, setFilter] = React.useState(FilterOptions[0].value);

  const renderEmpty = React.useCallback(() => {
    return (
      <View className='mt-8 justify-center items-center'>
        <Text className='text-xl'>Watchlist empty</Text>
      </View>
    );
  }, []);

  const renderItem = React.useCallback(({ item }: { item: Movie }) => {
    return (
      <View className='flex-row mb-2 w-ful bg-white'>
        <TouchableOpacity
          className='absolute top-0 right-0 p-2 z-50'
          onPress={() => dispatch(removeWatchList(item.id))}>
          <XIcon size={20} />
        </TouchableOpacity>
        <Image
          style={{ width: 96, height: 141, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
          source={item.image}
          contentFit='cover'
        />
        <View
          className='flex-1 gap-2 p-4 border border-l-0 border-gray-100'
          style={{ borderTopRightRadius: 8, borderBottomRightRadius: 8 }}>
          <Text className='text-xl font-bold'>{item.title}</Text>
          <Text className='text-gray-400'>{item.date}</Text>
          <Text>{item.description}</Text>
        </View>
      </View>
    );
  }, []);

  return (
    <View className='flex-1 p-8'>
      <Text className='text-xl font-extrabold'>My Watchlist</Text>
      <View className='flex-row gap-2 my-4 items-center'>
        <Text className='text-lg text-gray-300'>Filter by:</Text>
        <UnderlineSelect
          value={filter}
          onChange={setFilter}
          datasource={FilterOptions}
          disableSearch
        />
        <TouchableOpacity className='flex-row gap-2 items-center' onPress={() => setOrder(prev => !prev)}>
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
        data={watchList}
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