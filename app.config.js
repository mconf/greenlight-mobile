const Config = {
  // fallback to dev if not set
  apiUrl: process.env.API_URL ? process.env.API_URL : 'IP',
  enableHiddenFeatures: true,
  GOOGLE_ID: process.env.GOOGLE_ID ? process.env.GOOGLE_ID : 'GOOGLE_ID',
};

// set profile config
if (process.env.APP_ENV === 'production') {
  Config.buildType = 'app-bundle';
  Config.enableHiddenFeatures = false;
} else if (process.env.APP_ENV === 'development') {
  Config.distribution = 'internal';

  // android
  Config.buildType = 'apk';
}

// global config
Config.name = 'GreenlightMobile';

export default {
  name: Config.name,
  slug: 'greenlight-mobile',
  owner: 'bbb',
  version: '0.1.0',
  scheme: 'com.bbb.greenlightmobile',
  icon: './src/assets/icon.png',
  splash: {
    image: './src/assets/splash.png',
    resizeMode: 'contain'
  },
  android: {
    versionCode: 1,
    adaptativeIcon: {
      foregroundImage: './src/assets/icon.png',
      backgroundColor: '#ffffff'
    },
    permissions: [
      'android.permission.ACCESS_NETWORK_STATE',
      'android.permission.BLUETOOTH',
      'android.permission.CAMERA',
      'android.permission.CHANGE_NETWORK_STATE',
      'android.permission.INTERNET',
      'android.permission.MODIFY_AUDIO_SETTINGS',
      'android.permission.RECORD_AUDIO',
      'android.permission.SYSTEM_ALERT_WINDOW',
      'android.permission.WAKE_LOCK',
      'android.permission.FOREGROUND_SERVICE',
      'android.permission.BLUETOOTH_ADMIN',
      'android.permission.BLUETOOTH_CONNECT'
    ],
    package: 'com.bbb.greenlightmobile',
  },
  extra: {
    ...Config,
  }
};
