"use strict";
const SpecReporter = require("jasmine-spec-reporter").SpecReporter;
const AllureEnvPropsAdder =
  require("allure-env-properties-adder").AllureEnvPropsAdder;
const configSetup = require("./default-config-setup");

const ALLURE_RESULTS = "/allure-results";
const AUTO_GENERATED_FOLDER_NAME = "auto-generated";
const { GIT_COMMIT, JOB_NAME } = process.env;

let platform = "";
let browserName = "";
const commonConfigSetup = {
  onPrepareSetup() {
    const log4js = require("log4js");
    const dateStamp = new Date()
      .toUTCString()
      .replace(/[^A-Z0-9]+/gi, "-")
      .toLowerCase();
    log4js.configure({
      appenders: {
        multi: {
          type: "multiFile",
          base: `${AUTO_GENERATED_FOLDER_NAME}/logs/${
            process.env.BUILD_NUMBER || dateStamp
          }`,
          property: "categoryName",
          extension: ".log",
        },
      },
      categories: {
        default: { appenders: ["multi"], level: "all" },
      },
    });

    require("ts-node").register({
      project: "e2e/tsconfig.e2e.json",
    });

    jasmine.getEnv().addReporter(
      new SpecReporter({
        spec: {
          displayStacktrace: "all",
        },
      })
    );

    return browser.getCapabilities().then(function (cap) {
      platform = cap.get("platform");
      browserName = cap.get("browserName");
      browser.platform = platform;
      browser.browserName = browserName;
      commonConfigSetup.allureEnvPropsAdder();
    });
  },
  allureReporterSetup() {
    const AllureReporter = require("jasmine-allure-reporter");
    const reporter = new AllureReporter({
      resultsDir: `${AUTO_GENERATED_FOLDER_NAME}${ALLURE_RESULTS}`,
    });
    jasmine.getEnv().addReporter(reporter);

    jasmine.getEnv().afterEach(function (done) {
      browser.takeScreenshot().then(function (png) {
        allure.createAttachment(
          "Final screenshot",
          function () {
            return Buffer.from(png, "base64");
          },
          "image/png"
        )();
        done();
      });
    });
  },
  junitReporterSetup() {
    const jasmineReporters = require("jasmine-reporters");
    jasmine.getEnv().addReporter(
      new jasmineReporters.JUnitXmlReporter({
        consolidateAll: true,
        savePath: "target",
        filePrefix: Math.random().toString(15) + "test-result",
      })
    );
  },
  allureEnvPropsAdder() {
    jasmine.getEnv().addReporter(
      new AllureEnvPropsAdder({
        outputDir: `${AUTO_GENERATED_FOLDER_NAME}${ALLURE_RESULTS}`,
        override: false,
        props: {
          BASE_URL: browser.baseUrl,
          PLATFORM: platform,
          BROWSER_NAME: browserName,
          GIT_COMMIT: GIT_COMMIT,
          JOB_NAME: JOB_NAME,
        },
      })
    );
  },
  allurePendingTestsHandler: function () {
    const allureObject = allure._allure;
    allureObject.getCurrentSuite = () => {
      if (allureObject.suites.length > 0) {
        allureObject.suites[0].testcases =
          allureObject.suites[0].testcases.filter(
            (c) => c.status !== "pending"
          );
      }
      return allureObject.suites[0];
    };
  },
  configureAllReporters: function () {
    commonConfigSetup.allureReporterSetup();
    commonConfigSetup.junitReporterSetup();
    return commonConfigSetup.onPrepareSetup();
  },
};

module.exports = commonConfigSetup;
