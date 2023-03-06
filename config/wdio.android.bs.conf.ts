import { config as bsConfig } from './wdio.browserstack.conf';
import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../.env` });

export const config = {
  ...bsConfig,
  maxInstances: 1,
  capabilities: [
    {
      platformName: "Android",
      "os_version": "11.0",
      build: "Android",
      device: "Xiaomi Redmi Note 11",
      app: process.env.BS_APP,
      autoWebview: false,
      "browserstack.debug": true,
      "browserstack.console": "verbose",
      "browserstack.networkLogs": "true",
    },
  ],
};
