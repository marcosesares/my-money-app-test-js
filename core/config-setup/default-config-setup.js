"use strict";
const browserList = require("./browser-list.js");
const setupUtilities = require("./setup-utilities");
const { getParam, toBoolean } = setupUtilities;
const {
  MAX_INSTANCES,
  HEADLESS_BROWSER,
  SOFT_ASSERTIONS,
  LANGUAGE,
  ENABLE_VERBOSE_LOGGING,
  NUMBER_OF_RETRIES,
  MAX_SESSIONS,
  RANDOM_EXECUTION,
  RANDOM_SEED,
} = process.env;

const maxSessions = MAX_SESSIONS || getParam(5, "--params.maxSessions", false);
const maxBrowserInstances =
  MAX_INSTANCES || getParam(5, "--params.maxInstances", false);
const useHeadlessBrowser =
  HEADLESS_BROWSER ||
  toBoolean(getParam(false, "--params.headlessBrowser", false));
const numberOfRetries =
  NUMBER_OF_RETRIES || getParam(3, "--params.numberOfRetries", false);
const softAssertions =
  SOFT_ASSERTIONS || getParam(false, "--params.softAssertions", false);
const randomExecution =
  RANDOM_EXECUTION || getParam(false, "--params.randomExecution", false);
const randomSeed =
  RANDOM_SEED || getParam(new Date(), "--params.randomSeed", false);
const chromeHeadlessArgs = [
  "--headless",
  "--disable-gpu",
  "--window-size=1280x800",
  "--disable-dev-shm-usage",
  "--no-sandbox",
  "--acceptInsecureCerts",
  "--disable-infobars",
  "--ignore-certificate-errors",
  "--disable-blink-features=BlockCredentialedSubresources",
  "--disable-web-security",
];

/*  ABOUT --disable-dev-shm-usage:
    By default, Docker runs a container with a /dev/shm shared memory space 64MB.
    This is typically too small for Chrome and will cause Chrome to crash when rendering large pages.
    To fix, run the container with docker run --shm-size=1gb to increase the size of /dev/shm.
    Since Chrome 65, this is no longer necessary. Instead, launch the browser with the --disable-dev-shm-usage flag
    sources:
        - https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#tips
        - https://developers.google.com/web/tools/puppeteer/troubleshooting
*/
const chromeOptions = {
  args: useHeadlessBrowser ? chromeHeadlessArgs : ["--disable-infobars"],
  perfLoggingPrefs: {
    enableNetwork: true,
    enablePage: false,
  },
};
const loggingPrefs = {
  performance: "ALL",
  browser: "ALL",
};
const configSetup = {
  restartBrowserBetweenTests: false,
  SELENIUM_PROMISE_MANAGER: false,
  multiCapabilities: [
    {
      loggingPrefs,
      browserName: "chrome",
      chromeOptions: chromeOptions,
      shardTestFiles: "true",
      maxInstances: maxBrowserInstances,
      acceptInsecureCerts: true,
    },
  ],
  allScriptsTimeout: 300000,
  suites: {
    regression_tests:
      "./e2e/test-suites/regression-test-suite/**/*.e2e-spec.ts",
    smoke_tests: "./e2e/test-suites/smoke-test-suite/**/*.e2e-spec.ts",
    health_tests: "./e2e/test-suites/health-check-test-suite/**/*.e2e-spec.ts",
    e2e_tests: "./e2e/test-suites/e2e-test-suite/**/*.e2e-spec.ts",
    api_tests: "./e2e/test-suites/api/**/*.e2e-spec.ts",
  },
  capabilities: {
    loggingPrefs,
    browserName: "chrome",
    chromeOptions: chromeOptions,
    acceptInsecureCerts: true,
  },
  params: {
    numberOfRetries: numberOfRetries,
    maxSessions: maxSessions,
    verboseLogging:
      ENABLE_VERBOSE_LOGGING ||
      getParam(false, "--params.enableVerboseLogging", false),
    maxInstances: 5,
    users: {
      mcesar: {
        email: "marcosesares@gmail.com",
        password: "a2@MyMoney211",
      },
    },
    softAssertions: softAssertions,
    language: LANGUAGE || getParam("French", "--params.language", false),
  },
  baseUrl: "https://my-money-app-mocha.vercel.app/",
  framework: "jasmine",
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 300000,
    print: function () {},
    random: randomExecution,
    seed: randomSeed,
  },
};
module.exports = configSetup;
