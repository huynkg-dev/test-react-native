import Reactotron from 'reactotron-react-native';

Reactotron.configure({
    name: 'Expo App'
  }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

if (__DEV__) {
  Reactotron.clear();
}

export default Reactotron;