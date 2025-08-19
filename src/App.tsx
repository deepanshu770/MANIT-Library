import './style/theme'; // need to be on top
import Login from './screens/Login';
import { useMMKVString } from 'react-native-mmkv';
import { storage, StorageKeys } from './services/storage.service';
import Home from './screens/Home';

const App = () => {
  const [user] = useMMKVString(StorageKeys.USER, storage);

  return user ? <Home /> : <Login />;
};

export default App;
