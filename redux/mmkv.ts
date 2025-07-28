import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export interface MMKVStorage {
  setItem(key: string, value: string): Promise<boolean>;
  getItem(key: string): Promise<string | undefined>;
  removeItem(key: string): Promise<void>;
}

export const mmkvStorage: MMKVStorage = {
  setItem: (key: string, value: string): Promise<boolean> => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string): Promise<string | undefined> => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string): Promise<void> => {
    storage.delete(key);
    return Promise.resolve();
  },
};