import HomeFilter from '@/components/features/home/filter';
import HomeListMovies from '@/components/features/home/list-movie';
import { MovieFilter } from '@/models';
import { SortOptions, TagOptions } from '@/shared/helper';
import React from 'react';
import { View } from 'react-native';

export default function HomeScreen() {    
  const [filter, setFilter] = React.useState<MovieFilter>({
    search: '',
    tag: TagOptions[0].value,
    sort: SortOptions[0].value
  });

  return (
    <View className='flex-1 bg-white'>
      <HomeFilter onSearch={setFilter}/>
      <HomeListMovies filter={filter}/>
    </View>
  );
}