import * as Crypto from 'expo-crypto';
import { CircleAlertIcon, CircleCheckBigIcon, CircleXIcon } from 'lucide-nativewind';
import React, { createContext } from 'react';
import { Dimensions, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown, LinearTransition } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const VARIANTS = {
  ERROR: {
    color: 'bg-red-400',
    icon: <CircleXIcon size={20} color={'white'} />
  },
  WARNING: {
    color: 'bg-yellow-300',
    icon: <CircleAlertIcon size={20} color={'white'} />
  },
  SUCCESS: {
    color: 'bg-green-300',
    icon: <CircleCheckBigIcon size={20} color={'white'} />
  },
};

interface ToastConfig {
  text: string;
  variant: 'ERROR' | 'WARNING' | 'SUCCESS';
  timeout?: number;
};

interface ToastItem {
  id: string;
  text: string;
  variant: 'ERROR' | 'WARNING' | 'SUCCESS';
};

interface IToastContext {
  showToast: (config: ToastConfig) => void;
};

const Toast = ({ text, variant }: { text: string; variant: 'ERROR' | 'WARNING' | 'SUCCESS' }) => {
  return (
    <Animated.View
      layout={LinearTransition.springify()}
      entering={FadeInDown.duration(200)}
      exiting={FadeOutDown.duration(200)}
      style={{
        position: 'absolute',
        bottom: 120,
        width: SCREEN_WIDTH,
        zIndex: 9999
      }}
    >
      <View className={`flex-row gap-4 items-center mx-4 p-4 rounded ${VARIANTS[variant].color}`}>
        {VARIANTS[variant].icon}
        <Text className='flex-1 text-lg text-white'>{text}</Text>
      </View>
    </Animated.View>
  );
};

const ToastContext = createContext<IToastContext>({
  showToast: (config) => { }
});

export const useToast = () => {
  return React.useContext(ToastContext);
};

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const showToast = React.useCallback((config: ToastConfig) => {
    const key = Crypto.randomUUID();
    setToasts(prev => (
      [...prev, { ...config, id: key }]
    ));
    setTimeout(() => {
      setToasts(prev => (
        [...prev.filter(e => e.id !== key)]
      ));
    }, config.timeout || 2000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {toasts.map((e) => (
        <Toast
          key={e.id}
          text={e.text}
          variant={e.variant}
        />
      ))}
      {children}
    </ToastContext.Provider>
  );
}