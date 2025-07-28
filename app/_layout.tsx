import '@/ReactotronConfig';
import '@/global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '@/redux/store';
import ToastProvider from '@/components/shared/toast-provider';
import AppNavigation from '@/components/features/auth/app-navigation';
import { KeyboardProvider } from 'react-native-keyboard-controller';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <KeyboardProvider>
                <ToastProvider>
                  <AppNavigation />
                </ToastProvider>
              </KeyboardProvider>
            </PersistGate>
          </Provider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
