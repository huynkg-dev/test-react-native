import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeftIcon } from 'lucide-nativewind';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

type HeaderProps = (NativeStackHeaderProps | BottomTabHeaderProps) & {
  showHeader?: boolean;
};

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { navigation, route, options, showHeader } = props;
  const insets = useSafeAreaInsets();
  const title: string = options.headerTitle as string || '';
  const titleStyle: any = options.headerTitleStyle || {};
  const isTransparent: boolean = options.headerTransparent || false;
  const isShow: boolean = showHeader || false;
  const isCanGoBack: boolean = navigation.canGoBack();

  return (
    <>
      <StatusBar style={'dark'} translucent={true} />
      <View style={{ paddingTop: insets.top }} className={`${isTransparent ? 'bg-transparent' : 'bg-white'}`}>
        <View className='bg-white items-center justify-center py-2'>
          <Image
            style={{ width: 80, height: 60 }}
            source={require('@/assets/images/backgrounds/logo.png')}
            contentFit='cover'
          />
        </View>
        {isShow && (
          <View className='flex-row py-4'>
            <View className='flex-1'>
              {isCanGoBack && (
                <TouchableOpacity className='flex-1 items-center' onPress={() => navigation.goBack()}>
                  <ChevronLeftIcon size={24} color={'white'} />
                </TouchableOpacity>
              )}
            </View>
            <View className='flex-[5]'>
              <Text className='text-center text-xl text-white' style={titleStyle}>
                {title}
              </Text>
            </View>
            <View className='flex-1'>
              {options.headerRight && options.headerRight({ canGoBack: isCanGoBack })}
            </View>
          </View>
        )}
      </View>
    </>
  );
};

export default Header;