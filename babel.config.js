module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'react-native-unistyles/plugin',
      {
        // pass root folder of your application
        // all files under this folder will be processed by the Babel plugin.
        root: 'src',
      },
    ],
    // 'react-native-worklets-core/plugin',
    // 'react-native-reanimated/plugin', // listed last
  ],
};
