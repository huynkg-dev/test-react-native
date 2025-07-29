import { Button, Input, SelectBox } from '@/components/shared';
import React from 'react';
import { View, Text } from 'react-native';

const SortOptions = [
  { label: 'By alphabetical order', value: 'ALPHABE' },
  { label: 'By rating', value: 'RATING' },
  { label: 'By release date', value: 'RELEASE' }
];
const TagOptions = [
  { label: 'Now Playing', value: 'PLAY' },
  { label: 'Upcoming', value: 'UP' },
  { label: 'Popular', value: 'POP' },
];

const HomeFilter: React.FC = () => {
  const [search, setSearch] = React.useState('');
  const [tag, setTag] = React.useState(TagOptions[0].value);
  const [sort, setSort] = React.useState(SortOptions[0].value);
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
        onPress={() => console.log('Search pressed')}>
        <Text style={{ color: '#00000080' }}>Search</Text>
      </Button>
    </View>
  );
};

export default HomeFilter;