import * as log4js from 'log4js';
import { Logger } from 'log4js';
import { browser } from 'protractor';

declare var allure: any;
export class StepLogger {
    static logger: Logger;
    static stepIdVar = '';
    static id: number;
    static testCaseId: number;
    static logMessages = '';
    static debug = process.env.DEBUG || true;
    static noAllure = process.env.NO_ALLURE || false;
    static eachStepScreenshot = process.env.EACH_STEP_SCREENSHOT || false;
    static testStart: number;

    static set caseId(theCaseId: number) {
        this.testCaseId = theCaseId;
        this.logger = log4js.getLogger(`C${theCaseId}`);
        this.logger.debug(this.logMessages);
        this.id = 1;
        this.logMessages = '';
        this.testStart = new Date().getTime();
    }
    static feature(featureName: string) {
        if (!StepLogger.noAllure) {
            allure.feature(featureName);
        }
    }
    static step(stepName: string) {
        let operation = 'Pre-Condition';
        if (this.testCaseId) {
            operation = 'Step';
        }

        this.commonLogger(operation, stepName);

        if (this.eachStepScreenshot) {
            this.takeScreenShot(`Step: ${stepName}`);
        }
    }

    static stepId(optionalId = 0) {
        this.id = optionalId > 0 ? optionalId : this.id + 1;
        this.commonLogger('Step Id', this.id.toString());
    }

    static commonLogger(operation: string, step: string) {
        let message = `${this.stepIdVar}- *${operation}* - ${step}`;
        if (this.testStart !== undefined) {
            const passed = new Date().getTime() - this.testStart;
            message = ` +${passed / 1000}s ${message}`;
        }

        if (this.debug) {
            console.log(`${this.testCaseId || ''}${message}`);
        }

        if (!StepLogger.noAllure) {
            // tslint:disable-next-line:no-empty
            allure.createStep(message, () => {
            })();
        }

        if (this.logger) {
            this.logger.debug(message);
        } else {
            this.logMessages += message;
        }
    }

    static verification(verificationDescription: string) {
        this.commonLogger('Verification', verificationDescription);

        if (this.eachStepScreenshot) {
            this.takeScreenShot(`Verification: ${verificationDescription}`);
        }
    }

    static takeScreenShot(attachmentName: string) {
        // tslint:disable-next-line:no-floating-promises
        browser.takeScreenshot().then((png) => {
        if (!StepLogger.noAllure) {
            allure.createAttachment(attachmentName, function () {
                return Buffer.from(png, 'base64');
            }, 'image/png')();
        }});
    }

    /**
     * Called for any precondition related step-log shown towards Spec file, never used anywhere else such as validation/helper
     * @param {string} preConditionDescription
     */
    static preCondition(preConditionDescription: string) {
        this.commonLogger('Pre-Condition', preConditionDescription);
    }

    /**
     * Called for any postCondition related step-log shown towards Spec file
     * @param postConditionDescription
     */
    static postCondition(postConditionDescription: string) {
        this.commonLogger('Post-Condition', postConditionDescription);
    }

    /**
     * Called wherever a helper/validation method need to have a step/action step significant enough to log
     * @param {string} stepName
     */
    static subStep(stepName: string) {
        this.commonLogger('Sub-Step', stepName);
        if (this.eachStepScreenshot) {
            this.takeScreenShot(`Sub-step: ${stepName}`);
        }
    }

    /**
     * Called wherever a helper/validation method need to have a verification step significant enough to log
     * @param {string} verificationDescription
     */
    static subVerification(verificationDescription: string) {
        this.commonLogger('Sub-Verification', verificationDescription);
    }
}
