import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { ArrowDownIcon, ArrowUpIcon, XIcon } from 'lucide-nativewind';
import { removeWatchList } from '@/redux/slices/user-slice';
import React from 'react';
import { UnderlineSelect } from '@/components/shared';

const FilterOptions = [
  { label: 'Rating', value: 'RATE' },
  { label: 'Score', value: 'Score' },
];

const UserWatchList: React.FC = () => {
  const dispatch = useAppDispatch();
  const watchList = useAppSelector(state => state.user.watchList);
  const [order, setOrder] = React.useState(false);
  const [filter, setFilter] = React.useState(FilterOptions[0].value);

  const removeMovieFromWatchList = (id: number) => {
    dispatch(removeWatchList(id));
  };

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
      {watchList.map((item, index) => {
        return (
          <View
            key={index}
            className='flex-row mb-2 w-full border border-gray-100 bg-white'
            style={{ borderRadius: 8 }}>
            <Pressable
              className='absolute top-2 right-2'
              onPress={() => removeMovieFromWatchList(item.id)}>
              <XIcon size={20} />
            </Pressable>
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
          </View>
        );
      })}
    </View>
  );
};

export default UserWatchList;