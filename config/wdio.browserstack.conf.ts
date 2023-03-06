import { config as mainConfig } from './wdio.conf';
import * as child from 'child_process';

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
export const config = {
  ...mainConfig,
  protocol: "https",
  hostname: "hub.browserstack.com",
  // port: 443,
  // path: "/wd/hub",
  maxInstances: 1,
  user: process.env.BS_USER,
  key: process.env.BS_KEY,

  beforeSuite: async function (suite) {
    // @ts-ignore
    await browser.execute(`browserstack_executor: {"action": "setSessionName", "arguments": {"name": "${browser.isAndroid ? browser.capabilities.device : browser.capabilities.deviceName} - ${browser.capabilities.buildName} ${browser.capabilities.os_version} - ${suite.title}"}}`);
  },

  after: async function (result, capabilities, specs, error) {
    if (result === 0) {
      await browser.execute('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": ""}}');
    } else {
      await browser.execute(`browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": ""}}`);
    }

    const command = `curl -u "${process.env.BS_USER}:${process.env.BS_KEY}" -L -X POST "https://api-cloud.browserstack.com/app-automate/sessions/${browser.sessionId}/terminallogs" --ssl-no-revoke -F "file=@./results/results.log"`;
    child.exec(command);
  },
};
