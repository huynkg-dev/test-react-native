import { Button, Input, SelectBox } from "@/components/shared";
import React from "react";
import { View, Text } from "react-native";

const SortOptions = [
    { label: 'Release Date', value: 1 },
    { label: 'Rating', value: 2 },
    { label: 'Popularity', value: 3 },
    { label: 'Title', value: 4 },
];
const TagOptions = [
    { label: 'Now Playing', value: 1 },
    { label: 'Upcoming', value: 2 },
    { label: 'Popular', value: 3 },
];

const HomeFilter: React.FC = () => {
    const [search, setSearch] = React.useState('');
    const [tag, setTag] = React.useState(TagOptions[0].value);
    const [sort, setSort] = React.useState(SortOptions[0].value);
    return (
        <View className="gap-4">
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
                placeholder="Search..."
            />
            <Button 
                className="bg-gray rounded-full"
                onPress={() => console.log('Search pressed')}>
                <Text style={{color: '#00000080'}}>Search</Text>
            </Button>
        </View>
    );
};

export default HomeFilter;