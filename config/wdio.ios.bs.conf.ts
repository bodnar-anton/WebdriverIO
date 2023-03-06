import { config as bsConfig } from './wdio.browserstack.conf';
import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../.env` });

export const config = {
  ...bsConfig,
  maxInstances: 1,
  capabilities: [
    {
      "os_version": "14",
      build: "iOS",
      device: "iPad Air 4",
      app: process.env.BS_APP,
      autoWebview: false,
      "browserstack.debug": true,
      "browserstack.console": "verbose",
      "browserstack.networkLogs": "true",
    },
  ],
};
