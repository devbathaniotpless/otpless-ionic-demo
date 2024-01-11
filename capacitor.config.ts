import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ionicdemo.app',
  appName: 'otpless-ionic-demo',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
