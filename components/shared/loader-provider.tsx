import React, { createContext } from 'react';
import { ActivityIndicator, Dimensions, View, Text } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

export const Loader = () => {
  return (
    <View
      style={{
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: '#bcbcbc40',
        top: 0,
        left: 0,
        zIndex: 9999
      }}>
      <ActivityIndicator size='large' color='white' />
      <Text className='text-xl text-white'>Đang tải dữ liệu</Text>
    </View>
  );
};

interface ILoaderContext {
  showLoading: (config: boolean) => void;
};

const LoaderContext = createContext<ILoaderContext>({
  showLoading: (config) => { }
});

export const useLoader = () => {
  return React.useContext(LoaderContext);
};

export default function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState<boolean>(false);

  const showLoading = React.useCallback((config: boolean) => {
    setLoading(config);
  }, []);

  return (
    <LoaderContext.Provider value={{ showLoading }}>
      {loading && <Loader />}
      {children}
    </LoaderContext.Provider>
  );
}
