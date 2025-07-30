import { Button, Input, SelectBox } from '@/components/shared';
import { MovieFilter } from '@/models';
import { SortOptions, TagOptions } from '@/shared/helper';
import React from 'react';
import { View, Text } from 'react-native';

interface HomeFilterProps {
  onSearch?: (filter: MovieFilter) => void;
};

const HomeFilter: React.FC<HomeFilterProps> = ({
  onSearch
}) => {
  const [search, setSearch] = React.useState('');
  const [tag, setTag] = React.useState(TagOptions[0].value);
  const [sort, setSort] = React.useState(SortOptions[0].value);
  
  const handleSearch = () => {
    onSearch && onSearch({ search, tag, sort });
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