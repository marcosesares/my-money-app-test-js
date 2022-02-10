import { browser, protractor } from 'protractor';

import { VerboseLogger } from '../../../core/logger/verbose-logger';

import { CoreConstants } from './core-constants';
import { WaitHelper } from './wait-helper';

const { DEFAULT_TIMEOUT, TIMEOUTS } = CoreConstants;
/**
 * Alert helper for general utility
 */
export class AlertHelper {
    private static readonly EC = protractor.ExpectedConditions;

    /**
     * Wait for an alert to appear
     * @param {number} timeout in milliseconds
     * @param {string} message
     */
    public static async waitForAlertToBePresent(timeout: number = DEFAULT_TIMEOUT,
                                                message: string = 'Alert is not present') {
        return await browser.wait(this.EC.alertIsPresent(), timeout, message);
    }

    /**
     * Accept javascript's alert
     */
    public static async acceptAlert() {
        return await browser.driver.switchTo().alert().accept();
    }

    /**
     * Cancel javascript's alert
     * @param {number} timeout in milliseconds
     * @param {string} message
     */
    public static async cancelAlert(timeout: number = DEFAULT_TIMEOUT,
                                    message: string = 'Alert is not present') {
        await this.waitForAlertToBePresent(timeout, message);
        return await browser.switchTo().alert().dismiss();
    }

    /**
     * Handles anonymous alerts on navigating to different pages
     * @returns {Promise<void>}
     */
    public static async acceptAlertIfExists() {
        try {
            await WaitHelper.sleep(TIMEOUTS.xs);
            await browser.switchTo().alert().accept();
        } catch (e) {
            // handle alert error here
        }
    }

    /**
     * Dismiss javascript's alert if exists
     */
    public static async dismissAlertIfExists() {
        try {
            await WaitHelper.sleep(TIMEOUTS.xs);
            await browser.switchTo().alert().dismiss();
        } catch (e) {
            VerboseLogger.log(e);
        }
    }

    /**
     * Get javascript's alert text
     * @param {number} timeout in milliseconds
     * @param {string} message
     */
    public static async getAlertText(timeout: number = DEFAULT_TIMEOUT,
                                     message: string = 'Alert text could not be retrieved') {
        await this.waitForAlertToBePresent(timeout, message);
        return await browser.driver.switchTo().alert().getText();
    }

    /**
     * Check if alert is present
     */
    public static async isAlertPresent() {
        return await this.waitForAlertToBePresent().then(() => true).catch(() => false);
    }
}
