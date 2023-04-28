module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel', 'react-native-reanimated/plugin', 'transform-inline-environment-variables'],
      },
      development: {
        plugins: ['react-native-reanimated/plugin', 'transform-inline-environment-variables'],
      },
    },
    plugins: ['react-native-reanimated/plugin', 'transform-inline-environment-variables'],
  };
};
