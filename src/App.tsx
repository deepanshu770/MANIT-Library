import './style/theme'; // need to be on top
import Login from './screens/Login';
import { useMMKVString } from 'react-native-mmkv';
import { storage, StorageKeys } from './services/storage.service';
import Home from './screens/Home';

const App = ()=>{
  const [token] = useMMKVString(StorageKeys.TOKEN,storage);

  
 return token ? <Home/> : <Login/>
}

export default App;
