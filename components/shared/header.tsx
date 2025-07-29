import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeftIcon } from 'lucide-nativewind';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

type HeaderProps = (NativeStackHeaderProps | BottomTabHeaderProps) & {
  showHeader?: boolean;
  headerColor?: string;
};

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { navigation, options, showHeader, headerColor } = props;
  const insets = useSafeAreaInsets();
  const title: string = options.headerTitle as string || '';
  const titleStyle: any = options.headerTitleStyle || {};
  const isShow: boolean = showHeader || false;
  const isCanGoBack: boolean = navigation.canGoBack();

  return (
    <>
      <StatusBar style={'dark'} translucent={true} />
      <View style={{ paddingTop: insets.top, backgroundColor: 'white' }}>
        <View className='items-center justify-center py-4'>
          <Image
            style={{ width: 80, height: 60 }}
            source={require('@/assets/images/backgrounds/logo.webp')}
            contentFit='cover'
          />
        </View>
      </View>
      {isShow && (
        <View className='bg-blue-sky'>
          <View className='flex-row py-4' style={{ backgroundColor: headerColor }}>
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
        </View>
      )}
    </>
  );
};

export default Header;