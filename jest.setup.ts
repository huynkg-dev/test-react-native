// jest.setup.ts
import 'react-native-gesture-handler/jestSetup';

// Mock DeviceInfo
jest.mock('react-native-device-info', () => ({
  getUniqueId: jest.fn(() => Promise.resolve('mock-unique-id')),
  getModel: jest.fn(() => 'Mock Device'),
  getSystemVersion: jest.fn(() => '14.0'),
  getBrand: jest.fn(() => 'Mock Brand'),
  getDeviceId: jest.fn(() => 'mock-device-id'),
  getSystemName: jest.fn(() => 'iOS'),
  getBundleId: jest.fn(() => 'com.mock.app'),
  getVersion: jest.fn(() => '1.0.0'),
  getBuildNumber: jest.fn(() => '1'),
  default: {
    getUniqueId: jest.fn(() => Promise.resolve('mock-unique-id')),
    getModel: jest.fn(() => 'Mock Device'),
    getSystemVersion: jest.fn(() => '14.0'),
    getBrand: jest.fn(() => 'Mock Brand'),
    getDeviceId: jest.fn(() => 'mock-device-id'),
    getSystemName: jest.fn(() => 'iOS'),
    getBundleId: jest.fn(() => 'com.mock.app'),
    getVersion: jest.fn(() => '1.0.0'),
    getBuildNumber: jest.fn(() => '1'),
  },
}));

// Mock crypto-js
jest.mock('crypto-js', () => ({
  AES: {
    encrypt: jest.fn(() => ({ toString: jest.fn(() => 'mock-encrypted-string') })),
    decrypt: jest.fn(() => ({ toString: jest.fn(() => 'mock-decrypted-string') })),
  },
  enc: {
    Utf8: { parse: jest.fn(), stringify: jest.fn() },
    Base64: { parse: jest.fn(), stringify: jest.fn() },
  },
  SHA256: jest.fn(() => ({ toString: jest.fn(() => 'mock-hash') })),
  MD5: jest.fn(() => ({ toString: jest.fn(() => 'mock-hash') })),
  default: {
    AES: {
      encrypt: jest.fn(() => ({ toString: jest.fn(() => 'mock-encrypted-string') })),
      decrypt: jest.fn(() => ({ toString: jest.fn(() => 'mock-decrypted-string') })),
    },
    enc: {
      Utf8: { parse: jest.fn(), stringify: jest.fn() },
      Base64: { parse: jest.fn(), stringify: jest.fn() },
    },
    SHA256: jest.fn(() => ({ toString: jest.fn(() => 'mock-hash') })),
    MD5: jest.fn(() => ({ toString: jest.fn(() => 'mock-hash') })),
  },
}));

// Silence console warnings during tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock global fetch
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;