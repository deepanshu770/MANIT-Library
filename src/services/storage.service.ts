import { MMKV, Mode } from 'react-native-mmkv';

export const storage = new MMKV({
  id: `manit lib`,
  encryptionKey: 'manitLibraryApp',
  mode: Mode.SINGLE_PROCESS,
  readOnly: false,
});

export const StorageKeys = {
  USER: 'user',
  TOKEN: 'auth_token',
  BACKEND_URL: 'backend',
};
