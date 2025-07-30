import { Button, Input, SelectBox } from '@/components/shared';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { changeFilter } from '@/redux/slices/user-slice';
import { SortOptions, TagOptions } from '@/shared/helper';
import React from 'react';
import { View, Text } from 'react-native';

const HomeFilter: React.FC= () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.user.userFilter);
  const [search, setSearch] = React.useState(filter.search);
  const [tag, setTag] = React.useState(filter.tag);
  const [sort, setSort] = React.useState(filter.sort);
  
  const handleSearch = () => {
    dispatch(changeFilter({ search, tag, sort }));
  };

  return (
    <View className='gap-2 mb-4 px-8'>
      <SelectBox
        value={tag}
        onChange={setTag}
        datasource={TagOptions}
        disableSearch
      />
      <SelectBox
        value={sort}
        onChange={setSort}
        datasource={SortOptions}
        disableSearch
      />
      <Input
        value={search}
        onChangeText={setSearch}
        placeholder='Search...'
      />
      <Button
        className='bg-gray-200 rounded-full'
        onPress={handleSearch}>
        <Text style={{ color: '#00000080' }}>Search</Text>
      </Button>
    </View>
  );
};

export default HomeFilter;