import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.skillping.app',
  appName: 'skillping-app',
  webDir: 'dist/ProyectoTfg_A16_v2',
  server: { 
    url: 'https://skillping.netlify.app',
    cleartext: true
    }
};

export default config;
