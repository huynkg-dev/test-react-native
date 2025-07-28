import HomeFilter from '@/components/features/home/filter';
import HomeListMovies from '@/components/features/home/list-movie';
import { View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className='flex-1 bg-white p-8'>
      <HomeFilter/>
      <HomeListMovies/>
    </View>
  );
}